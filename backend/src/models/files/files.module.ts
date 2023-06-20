import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'models/users/users.module';

import { File, FileSchema } from './schemas';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    UsersModule,
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
