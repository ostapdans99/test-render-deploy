import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class SetFavoritesUserDto {
  @IsString()
  readonly userId: Types.ObjectId;

  @IsString()
  readonly postId: Types.ObjectId;
}
