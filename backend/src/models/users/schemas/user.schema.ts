import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { SCHEMAS } from 'common/constants';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: '' })
  status: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: SCHEMAS.POST }])
  favoritesPosts: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
