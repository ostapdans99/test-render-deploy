import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

import { SCHEMAS } from 'common/constants';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: SCHEMAS.USER,
  })
  user: ObjectId;
}

export const FileSchema = SchemaFactory.createForClass(File);
