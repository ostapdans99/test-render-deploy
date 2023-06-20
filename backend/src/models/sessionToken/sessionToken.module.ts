import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { SessionToken, SessionTokenSchema } from './schemas';
import { SessionTokenService } from './sessionToken.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SessionToken.name, schema: SessionTokenSchema },
    ]),
  ],
  providers: [SessionTokenService, JwtService],
  exports: [SessionTokenService],
})
export class SessionTokenModule {}
