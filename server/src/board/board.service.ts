import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentRepository } from 'src/content/content.repository';
import { ContentService } from 'src/content/content.service';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    private contentRepository: ContentRepository,
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  private logger = new Logger('BoardService');

  async getAllBoards(): Promise<Board[]> {
    this.logger.debug(`getAllBoards()`);
    return this.boardRepository.find();
  }
  getBoardByTitle(board_title): Promise<Board> {
    // Body
    // board_title : 자유게시판
    // console.log(this.contentRepository)
    return this.boardRepository.getBoardByTitle(board_title);
  }
  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  deleteBoard(id: number) {
    this.boardRepository.deleteBoard(id);
  }
}
