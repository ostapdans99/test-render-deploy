import { UploadUserAvatarDto } from './dto/upload-user-avatar.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as fs from 'fs';

import { UsersService } from 'models/users/users.service';

import { File, FileDocument } from './schemas';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async uploadUserAvatar(uploadUserAvatarDto: UploadUserAvatarDto) {
    const { file, userId } = uploadUserAvatarDto;

    const userAvatarFromDb = await this.fileModel.findOneAndDelete({
      user: userId,
    });

    if (userAvatarFromDb) {
      fs.unlink(
        `uploads/${userAvatarFromDb.filename}`,
        (error) => error && console.log(error),
      );
    }

    const userAvatar = await this.fileModel.create({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      path: file.path,
      mimetype: file.mimetype,
      user: userId,
    });

    const user = await this.usersService.findUserById(userId);

    user.avatar = `${this.configService.get('api_url')}/${userAvatar.path}`;

    await user.save();

    return userAvatar;
  }
}
