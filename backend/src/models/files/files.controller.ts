import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'common/guards';
import { ROUTES } from 'common/constants';
import { GetUserId } from 'common/decorators';
import { generateResponseError } from 'common/utils';

import { fileStorage } from './storage';
import { FilesService } from './files.service';

@Controller(ROUTES.FILES)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  async uploadUserAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @GetUserId() userId: Types.ObjectId,
  ) {
    try {
      return await this.filesService.uploadUserAvatar({ file, userId });
    } catch (error) {
      generateResponseError(error);
    }
  }
}
