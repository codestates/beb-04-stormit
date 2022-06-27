import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from 'src/content/content.repository';
import { ContentService } from 'src/content/content.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository, ContentRepository])],
  controllers: [BoardController],
  providers: [BoardService, ContentService],
  exports: [BoardService],
})
export class BoardModule {}
