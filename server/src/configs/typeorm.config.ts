import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';

function typeORMConfig() :  TypeOrmModuleOptions {
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
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'mypassword',
        database: 'STORMIT_DB',
        entities: commonConfig.ENTITIES,
        synchronize: commonConfig.SYNCRONIZE,
        logging: true,
        migrations: commonConfig.MIGRATIONS,
        cli: commonConfig.CLI,
        migrationsRun: commonConfig.MIGRATIONS_RUN,
    }

    return ormconfig;
    // type: 'mysql',
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: 'mypassword',
    // database: 'STORMIT_DB',
    // entities: [__dirname + '/../**/*.entity.{js,ts}'], 
    // synchronize: true,

}



export {typeORMConfig}