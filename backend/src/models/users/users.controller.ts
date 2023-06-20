import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Types } from 'mongoose';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'common/guards';
import { ROUTES, SUBROUTES } from 'common/constants';
import { GetUserId } from 'common/decorators';
import { generateResponseError } from 'common/utils';
import { UsersService } from 'models/users/users.service';

import { ChangeStatusDto } from './dto';

@Controller(ROUTES.USERS)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get(SUBROUTES.ACTIVATE_TOKEN)
  async activateUser(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userData = await this.usersService.activateUser(token);

      await this.usersService.setCookie(res, userData);

      return res.redirect(this.configService.get('client_url'));
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Patch(SUBROUTES.CHANGE_STATUS)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async changeStatus(
    @GetUserId() userId: Types.ObjectId,
    @Body() changeStatusDto: ChangeStatusDto,
  ) {
    try {
      const { status } = changeStatusDto;

      const userData = await this.usersService.changeStatus({ userId, status });

      return userData;
    } catch (error) {
      generateResponseError(error);
    }
  }
}
