import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateDataDto } from './dto/updateData.dto';

import { Board } from './entity/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, content } = createBoardDto;
    const board = this.create({
      title,
      content,
    });

    await this.save(board);
    return board;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log('result', result);
  }
  async updateBoard(id: number, updateDataDto: UpdateDataDto): Promise<Board> {
    // const board = await this.getBoardById(id);
    // // this.deleteBoard(id);
    const { content_id, content } = updateDataDto;
    // // await this.save(board);
    console.log(`content id: ${content_id}\nparam : ${content}`);
    // insert로 업데이트하기
    return;
  }
}

// export class DeleteBoard extends Repository<Board> {

// }
