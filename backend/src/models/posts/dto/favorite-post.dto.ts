import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class FavoritePostDto {
  @IsString()
  readonly userId: Types.ObjectId;

  @IsString()
  readonly postId: string;
}
