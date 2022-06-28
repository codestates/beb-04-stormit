import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { typeORMConfig } from './configs/typeorm.config';
import { Content } from './content/entity/content.entity';
import { ContentModule } from './content/content.module';
import { ContentRepository } from './content/content.repository';
import * as config from 'config';
import { JoinColumn } from 'typeorm';
import { Board } from './board/entity/board.entity';
import { BoardModule } from './board/board.module';
import { Comment } from './comment/entity/comment.entity';
import { CommentModule } from './comment/comment.module';

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
      entities: [Content, User, Board, Comment],
      // entities: [__dirname + '../**/*.entity{.ts,.js}'],
      synchronize: dbConfig.synchronize,
    }),
    // TypeOrmModule.forRootAsync({useFactory: typeORMConfig}),
    AuthModule,
    ContentModule,
    BoardModule,
    CommentModule,
  ],
})
export class AppModule {}
