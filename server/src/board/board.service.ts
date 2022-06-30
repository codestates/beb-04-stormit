import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  private logger = new Logger('BoardService');

  async getBoardInfo(): Promise<object> {
    this.logger.debug(`getBoardInfo()`);
    return this.boardRepository.getBoardInfo();
  }
  getBoardByTitle(board_title): Promise<object> {
    return this.boardRepository.getBoardByTitle(board_title);
  }
  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  // 보드 생성
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  deleteBoard(id: number) {
    this.boardRepository.deleteBoard(id);
  }
}
