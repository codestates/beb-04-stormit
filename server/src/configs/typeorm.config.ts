import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Content } from 'src/content/entity/content.entity';
import * as config from 'config';

import { Board } from 'src/content/entity/board.entity';
import { Comment } from 'src/content/entity/comment.entity';
const dbConfig = config.get('db');
console.log();
export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [Content, Board, Comment], // 사용할 entity의 클래스명을 넣어둔다.
  synchronize: dbConfig.synchronize, // false로 Z해두는 게 안전하다.
};

// entities: [__dirname + '/**/entity/*.entity{.ts,.js}'], // 사용할 entity의 클래스명을 넣어둔다.
// 'src/board/entity/*.entity{.ts,.js}'
// /Users/jhka/Documents/fdongfdong/BEB_04/stormit_01/beb-04-stormit/server/dist/configs
// console.log(__dirname);
// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: dbConfig.type,
//   host: dbConfig.host,
//   port: dbConfig.port,
//   username: dbConfig.username,
//   password: dbConfig.password,
//   database: dbConfig.database,
//   entities: ['dist/**/*.entity{.ts,.js}'], // 사용할 entity의 클래스명을 넣어둔다.
//   synchronize: dbConfig.synchronize, // false로 해두는 게 안전하다.
// };

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: dbConfig.type,
//   host: dbConfig.host,
//   port: dbConfig.port,
//   username: dbConfig.username,
//   password: dbConfig.password,
//   database: dbConfig.database,
//   entities: ['dist/**/*.entity{.ts,.js}'], // 사용할 entity의 클래스명을 넣어둔다.
//   synchronize: dbConfig.synchronize, // false로 Z해두는 게 안전하다.
// };
