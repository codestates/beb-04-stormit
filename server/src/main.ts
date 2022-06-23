import { Logger } from '@nestjs/common';
import * as config from 'config';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('NODE_SERVER_PORT');
  // app.use(cookieParser)
  await app.listen(port);
  console.log(`Server listening on port ${port}`);
}
bootstrap();
