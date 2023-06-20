import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActionTokenService } from './actionToken.service';
import { ActionToken, ActionTokenSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActionToken.name, schema: ActionTokenSchema },
    ]),
  ],
  providers: [ActionTokenService],
  exports: [ActionTokenService],
})
export class ActionTokenModule {}
