import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Types } from 'mongoose';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'common/guards';
import { ROUTES, SUBROUTES } from 'common/constants';
import { CreateUserDto, TokensDto } from 'common/dto';
import { GetTokens, GetUserId } from 'common/decorators';
import { generateResponseError } from 'common/utils';
import { UsersService } from 'models/users/users.service';

import { ChangePasswordDto, LoginUserDto, ForgotPasswordDto } from './dto';
import { AuthService } from './auth.service';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post(SUBROUTES.REGISTER) async register(
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const userData = await this.authService.register(createUserDto);

      return userData;
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Post(SUBROUTES.LOGIN) async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userData = await this.authService.login(loginUserDto);

      await this.usersService.setCookie(res, userData);

      return userData;
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Delete(SUBROUTES.LOGOUT)
  @UseGuards(RefreshJwtAuthGuard)
  async logout(
    @GetTokens() tokens: TokensDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    try {
      const { refreshToken } = tokens;

      await this.authService.logout(refreshToken);

      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');

      return true;
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Get()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getUserProfile(@GetUserId() userId: Types.ObjectId) {
    try {
      return await this.authService.getUserProfile(userId);
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Post(SUBROUTES.REFRESH)
  @UseGuards(RefreshJwtAuthGuard)
  async refresh(
    @GetUserId() userId: Types.ObjectId,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userData = await this.authService.refresh(userId);

      await this.usersService.setCookie(res, userData);

      return userData;
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Post(SUBROUTES.FORGOT_PASSWORD)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      const { email } = forgotPasswordDto;

      return await this.authService.forgotPassword(email);
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Get(SUBROUTES.FORGOT_PASSWORD_TOKEN)
  async getChangePasswordPage(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    try {
      return res.redirect(
        `${this.configService.get('client_url')}/${
          SUBROUTES.CHANGE_PASSWORD
        }/${token}`,
      );
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Patch(SUBROUTES.CHANGE_PASSWORD)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userData = await this.authService.changePassword(changePasswordDto);

      await this.usersService.setCookie(res, userData);

      return userData;
    } catch (error) {
      generateResponseError(error);
    }
  }
}
