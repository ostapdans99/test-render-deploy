import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const client_url = configService.get('client_url');

  const corsOptions = {
    origin: client_url,
    credentials: true,
    optionSuccessStatus: 200,
  };

  app.enableCors(corsOptions);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
