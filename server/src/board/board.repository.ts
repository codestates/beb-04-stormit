import { Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  private logger = new Logger('BoardRepository');

  async getBoardById(id: string) {
    const found = await this.findOne(id, { relations: ['contents'] });
    this.logger.debug(`getBoardById() : ${JSON.stringify(found)}`);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    } else {
      return found;
    }
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { board_title } = createBoardDto;
    const board = this.create({
      board_title,
    });
    this.logger.debug(`createBoard() : ${board_title}`);
    await this.save(board);
    return board;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    this.logger.debug(`deleteBoard() : ${JSON.stringify(result)}`);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
}
