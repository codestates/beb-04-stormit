import { Logger } from '@nestjs/common';
// import * as config from 'config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const serverConfig = config.get('server');

  // const port = serverConfig.port; // port configuration

  const options = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(options);
  app.use(cookieParser());
  await app.listen(4000);
  console.log(`Server listening on port ${4000}`);
}
bootstrap();
