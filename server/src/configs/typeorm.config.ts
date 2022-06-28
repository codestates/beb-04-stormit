import { Content } from 'src/content/entity/content.entity';
import { Board } from 'src/board/entity/board.entity';
import * as config from 'config';
import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
const dbConfig = config.get('db');
function typeORMConfig(): TypeOrmModuleOptions {
  const commonConfig = {
    SYNCRONIZE: false,
    ENTITIES: [__dirname + '/entity/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
      migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: false,
  };

  const ormconfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.post,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: commonConfig.ENTITIES,
    synchronize: commonConfig.SYNCRONIZE,
    logging: true,
    migrations: commonConfig.MIGRATIONS,
    cli: commonConfig.CLI,
    migrationsRun: commonConfig.MIGRATIONS_RUN,
  };

  return ormconfig;
}

export { typeORMConfig };
