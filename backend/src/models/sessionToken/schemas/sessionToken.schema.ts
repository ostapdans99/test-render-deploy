import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type SessionTokenDocument = SessionToken & Document;

@Schema({ timestamps: true })
export class SessionToken {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  user: ObjectId;

  @Prop({ required: true })
  refreshToken: string;
}

export const SessionTokenSchema = SchemaFactory.createForClass(SessionToken);
