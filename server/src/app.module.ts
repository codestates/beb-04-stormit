import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { ContentModule } from './content/content.module';
import { Board } from './board/entity/board.entity';
import { Comment } from './content/entity/comment.entity';
import { Content } from './content/entity/content.entity';

import * as config from 'config';
import { BoardModule } from './board/board.module';

const serverConfig = config.get('server');
const dbConfig = config.get('db');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [User, Content, Board, Comment],
      synchronize: true,
    }),
    BoardModule,
    AuthModule,
    ContentModule,
  ],
  controllers: [],
})
export class AppModule {}
