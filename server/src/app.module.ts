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
import { Board } from './content/entity/board.entity';
import { Comment } from './content/entity/comment.entity';
import { JoinColumn } from 'typeorm';


const serverConfig = config.get('server')
const dbConfig = config.get('db')


@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    
    }),
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [User,Content, Board, Comment],
      // entities: [__dirname + '../**/*.entity{.ts,.js}'],
      synchronize: dbConfig.synchronize,
    }),
    // TypeOrmModule.forRootAsync({useFactory: typeORMConfig}),
    AuthModule

  ],

})
export class AppModule {}
