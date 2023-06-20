import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { SCHEMAS } from 'common/constants';

export type ActionTokenDocument = ActionToken & Document;

@Schema({ timestamps: true, expires: process.env.EXPIRE_ACTION_TOKEN })
export class ActionToken {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: SCHEMAS.USER,
  })
  user: Types.ObjectId;

  @Prop({ required: true })
  token: string;
}

export const ActionTokenSchema = SchemaFactory.createForClass(ActionToken);
ActionTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });
