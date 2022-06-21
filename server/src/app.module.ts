import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board/board.controller';
import { Board } from './board/entity/board.entity';
import { BoardModule } from './board/board.module';
import { BoardService } from './board/board.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([Board]),
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
