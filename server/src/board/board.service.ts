import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto); // repository 패턴
  }
}

// ORM에서는 remove, delete 메서드가 있다.
// remove: 무조건 존재하는 아이템을 remove 메소드를 이용햇 지워줘야한다. 그렇지 않으면 404 Error
// remove로 지우려면 1.아이템이 있는지 한번 찾아보기  2. 아이템 지우기 2번 데이터베이스를 이용해야한다.
// delete: 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없다.
