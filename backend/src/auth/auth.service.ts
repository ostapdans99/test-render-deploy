import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

import { MAIL, ROUTES, SUBROUTES } from 'common/constants';
import { APP_ERROR } from 'common/errors';
import { CreateUserDto } from 'common/dto';
import { UsersService } from 'models/users/users.service';
import { SessionTokenService } from 'models/sessionToken/sessionToken.service';
import { ActionTokenService } from 'models/actionToken/actionToken.service';
import { MailService } from 'providers/mail/mail.service';

import { LoginUserDto, ChangePasswordDto } from './dto';
import { MESSAGES } from './common/constants';
import { ERROR } from './common/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionTokenService: SessionTokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly actionTokenService: ActionTokenService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const candidate = await this.usersService.findUserByEmail(email);

    if (candidate && candidate.isActivated)
      throw new BadRequestException(ERROR.USER_EXIST);

    if (candidate && !candidate.isActivated)
      await this.usersService.deleteUserByEmail(email);

    await this.usersService.createUser(createUserDto);

    return MESSAGES.REGISTER_MESSAGE;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findUserByEmail(email);

    if (!user) throw new BadRequestException(ERROR.USER_NOT_EXIST);

    if (!user.isActivated) throw new MethodNotAllowedException();

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) throw new BadRequestException(ERROR.INCORRECT_DATA);

    const userDto = await this.usersService.getPublicUser(user);

    const tokens = await this.usersService.generateAndSaveTokens(userDto);

    return { user: userDto, tokens };
  }

  async logout(refreshToken: string) {
    await this.sessionTokenService.removeToken(refreshToken);
  }

  async getUserProfile(userId: Types.ObjectId) {
    const user = await this.usersService.findUserById(userId);

    return await this.usersService.getPublicUser(user);
  }

  async refresh(userId: Types.ObjectId) {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new BadRequestException();
    }

    const userDto = await this.usersService.getPublicUser(user);

    const tokens = await this.usersService.generateAndSaveTokens(userDto);

    return { user: userDto, tokens };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException(APP_ERROR.USER_NOT_FOUND);
    }

    const userToken = await this.actionTokenService.generateAndSaveToken(
      user._id,
    );

    const link = `${this.configService.get('api_url')}/${ROUTES.AUTH}/${
      SUBROUTES.FORGOT_PASSWORD
    }/${userToken.token}`;

    await this.mailService.sendMail({
      email,
      link,
      mailTitle: MAIL.CHANGE_PASSWORD_MAIL_TITLE,
      mailContentTitle: MAIL.CHANGE_PASSWORD_MAIL_CONTENT_TITLE,
    });
    return MESSAGES.FORGOT_PASSWORD_MESSAGE;
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { token, password } = changePasswordDto;

    const userLink = await this.actionTokenService.findToken(token);

    const hashedPassword = await this.usersService.hashPassword(password);

    const user = await this.usersService.findAndUpdateUser(
      {
        _id: userLink.user,
      },
      { password: hashedPassword },
    );

    if (!user) {
      throw new BadRequestException(APP_ERROR.USER_NOT_FOUND);
    }

    await this.actionTokenService.deleteToken(token);

    const userDto = await this.usersService.getPublicUser(user);
    const tokens = await this.usersService.generateAndSaveTokens(userDto);

    return { user: userDto, tokens };
  }
}
