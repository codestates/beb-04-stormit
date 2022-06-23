import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { BoardService } from 'src/board/board.service';
import { BoardRepository } from 'src/board/board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository, BoardRepository])],
  controllers: [ContentController],
  providers: [ContentService, BoardService],
  exports: [ContentService],
})
export class ContentModule {}
