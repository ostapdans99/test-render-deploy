import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SessionTokenModule } from 'models/sessionToken/sessionToken.module';
import { ActionTokenModule } from 'models/actionToken/actionToken.module';
import { MailModule } from 'providers/mail/mail.module';

import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
    SessionTokenModule,
    ActionTokenModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
