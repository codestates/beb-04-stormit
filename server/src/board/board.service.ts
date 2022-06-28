import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {
    // this.boardRepository.setBoardTitle();
    // 왜 계속 불리는거지 ㅂㄷ
  }
  private logger = new Logger('BoardService');

  async getAllBoards(): Promise<Board[]> {
    this.logger.debug(`getAllBoards()`);
    const result = this.boardRepository.find();
    if (result) {
      return result;
    } else {
      throw new NotFoundException('');
    }
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
