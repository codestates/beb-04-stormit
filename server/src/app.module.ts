import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';


@Module({
  imports: [
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

    AuthModule
  ],
})
export class AppModule {}
