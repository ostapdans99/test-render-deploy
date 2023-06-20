import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DeletePostDto {
  @IsString()
  readonly userId: Types.ObjectId;

  @IsString()
  readonly postId: string;
}
