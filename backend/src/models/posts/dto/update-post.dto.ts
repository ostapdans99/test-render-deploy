import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePostDto {
  @IsString()
  readonly userId: Types.ObjectId;

  @IsString()
  readonly postId: string;

  @IsString()
  readonly content: string;
}
