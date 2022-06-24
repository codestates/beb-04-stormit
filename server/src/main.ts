
import { Logger } from '@nestjs/common';
import * as config from 'config';


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  
  const serverConfig = config.get('server')

  const port = serverConfig.port  // port configuration
  app.use(cookieParser());
  await app.listen(port);
  console.log(`Server listening on port ${port}`)

}
bootstrap();

