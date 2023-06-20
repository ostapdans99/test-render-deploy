import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { ROUTES, SUBROUTES, MAIL } from 'common/constants';
import { APP_ERROR } from 'common/errors';
import { CreateUserDto, UserDto } from 'common/dto';
import { SessionTokenService } from 'models/sessionToken/sessionToken.service';
import { ActionTokenService } from 'models/actionToken/actionToken.service';
import { MailService } from 'providers/mail/mail.service';

import { User, UserDocument } from './schemas';
import { SetFavoritesUserDto, ChangeStatusDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly sessionTokenService: SessionTokenService,
    private readonly actionTokenService: ActionTokenService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findAndUpdateUser(
    query: FilterQuery<UserDocument>,
    payload: UpdateQuery<UserDocument>,
  ) {
    return await this.userModel.findOneAndUpdate(query, payload, { new: true });
  }

  async findUserById(id: Types.ObjectId) {
    return await this.userModel.findById(id);
  }

  async deleteUserByEmail(email: string) {
    return await this.userModel.deleteOne({ email });
  }

  async setCookie(res: Response, authUserResponse) {
    const refreshExpire = this.configService.get('expire_jwt_refresh');
    const accessExpire = this.configService.get('expire_jwt_access');

    res.cookie('refreshToken', authUserResponse.tokens.refreshToken, {
      maxAge: refreshExpire,
      httpOnly: true,
    });

    res.cookie('accessToken', authUserResponse.tokens.accessToken, {
      maxAge: accessExpire,
      httpOnly: true,
    });
  }

  async setFavorites(setFavoritesUserDto: SetFavoritesUserDto) {
    const { userId, postId } = setFavoritesUserDto;

    const user = await this.findUserById(userId);
    const hasPost = user.favoritesPosts.includes(postId);

    return await this.userModel.findByIdAndUpdate(userId, {
      [`${hasPost ? '$pull' : '$push'}`]: {
        favoritesPosts: postId,
      },
    });
  }

  async getPublicUser(userDto: UserDto) {
    const { _id, username, email, avatar, status, isActivated } = userDto;

    return {
      _id,
      username,
      email,
      avatar,
      status,
      isActivated,
    };
  }

  async generateAndSaveTokens(userDto: UserDto) {
    const tokens = await this.sessionTokenService.generateJwtToken({
      ...userDto,
    });

    const { _id } = userDto;

    await this.sessionTokenService.saveToken(_id, tokens.refreshToken);

    return tokens;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const userToken = await this.actionTokenService.generateAndSaveToken(
      user._id,
    );

    const link = `${this.configService.get('api_url')}/${ROUTES.USERS}/${
      SUBROUTES.ACTIVATE
    }/${userToken.token}`;

    await this.mailService.sendMail({
      email,
      link,
      mailTitle: MAIL.ACTIVATION_ACCOUNT_MAIL_TITLE,
      mailContentTitle: MAIL.ACTIVATION_ACCOUNT_MAIL_CONTENT_TITLE,
    });

    return user;
  }

  async activateUser(token: string) {
    const userLink = await this.actionTokenService.findToken(token);

    if (!userLink) {
      throw new BadRequestException(APP_ERROR.USER_NOT_FOUND);
    }

    const user = await this.findUserById(userLink.user);

    user.isActivated = true;

    await user.save();

    await this.actionTokenService.deleteToken(token);

    const userDto = await this.getPublicUser(user);

    const tokens = await this.generateAndSaveTokens(userDto);

    return { user: userDto, tokens };
  }

  async changeStatus(changeStatusDto: ChangeStatusDto) {
    const { userId, status } = changeStatusDto;

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
      },
    );

    const userDto = await this.getPublicUser(user);

    return userDto;
  }
}
