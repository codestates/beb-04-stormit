import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/board/entity/board.entity';
import * as config from 'config';
const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [Board], // 사용할 entity의 클래스명을 넣어둔다.
  synchronize: dbConfig.synchronize, // false로 해두는 게 안전하다.
};
