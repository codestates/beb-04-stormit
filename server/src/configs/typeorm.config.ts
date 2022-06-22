import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeORMConfig :  TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mypassword',
    database: 'STORMIT_DB',
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // 사용할 entity의 클래스명을 넣어둔다.
    synchronize: true, // false로 해두는 게 안전하다.

}