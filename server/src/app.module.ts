import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Content } from './content/entity/content.entity';
import { ContentModule } from './content/content.module';

import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { ContentRepository } from './content/content.repository';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ContentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
