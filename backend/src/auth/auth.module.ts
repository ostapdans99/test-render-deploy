import { Module } from '@nestjs/common';

import { UsersModule } from 'models/users/users.module';
import { SessionTokenModule } from 'models/sessionToken/sessionToken.module';
import { ActionTokenModule } from 'models/actionToken/actionToken.module';
import { MailModule } from 'providers/mail/mail.module';

import { AccessJwtStrategy, RefreshJwtStrategy } from './strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, SessionTokenModule, MailModule, ActionTokenModule],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
