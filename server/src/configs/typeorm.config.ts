import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/board/entity/pages.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '0410',
  database: 'stormit_test',
  entities: [Board], // 사용할 entity의 클래스명을 넣어둔다.
  synchronize: true, // false로 해두는 게 안전하다.
};
