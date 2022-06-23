import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { typeORMConfig } from './configs/typeorm.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mypassword',
      database: 'STORMIT_DB',
      entities: [User],
      // entities: [__dirname + '../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // TypeOrmModule.forRootAsync({useFactory: typeORMConfig}),
    AuthModule

  ],
})
export class AppModule {}
