import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PostsDto {
  @IsString()
  readonly userId?: Types.ObjectId;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly limit: number;
}
