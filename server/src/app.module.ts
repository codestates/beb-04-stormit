import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { Content } from './content/entity/content.entity';
import { ContentModule } from './content/content.module';
import * as config from 'config';
import { Comment } from './content/entity/comment.entity';
import { BoardModule } from './board/board.module';
import { Board } from './board/entity/board.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nononmysql123',
      database: 'stormit',

      entities: [User, Content, Board, Comment],
      // entities: [__dirname + '../**/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: 'KST',
    }),
    BoardModule,
    AuthModule,
    ContentModule,
  ],
  controllers: [],
})
export class AppModule {}
