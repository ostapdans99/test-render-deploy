import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { SCHEMAS } from 'common/constants';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: SCHEMAS.USER,
  })
  author: Types.ObjectId;

  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
  ])
  favoritedBy: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
