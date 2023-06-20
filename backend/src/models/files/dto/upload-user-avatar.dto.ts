import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UploadUserAvatarDto {
  readonly file: Express.Multer.File;

  @IsString()
  readonly userId: Types.ObjectId;
}
