import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configurations } from './configurations';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { PostsModule } from './models/posts/posts.module';
import { SessionTokenModule } from './models/sessionToken/sessionToken.module';
import { ActionTokenModule } from './models/actionToken/actionToken.module';
import { FilesModule } from './models/files/files.module';
import { MailModule } from './providers/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('host'),
      }),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    SessionTokenModule,
    MailModule,
    ActionTokenModule,
    FilesModule,
  ],
})
export class AppModule {}
