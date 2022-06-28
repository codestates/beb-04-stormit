import { Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  private logger = new Logger('BoardRepository');

  async getBoardById(id: number) {
    const found = await this.findOne(id, { relations: ['contents'] });
    this.logger.debug(`getBoardById() : ${JSON.stringify(found)}`);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    } else {
      return found;
    }
  }
  async getBoardByTitle(_board_title: string): Promise<object> {
    const temp = await this.findOne(_board_title, {
      relations: ['contents'],
    });
    const en_month = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    const temp2 = temp.contents.map(
      ({ post_content, post_title, created_at }) => {
        const _date = created_at.toString();
        const _day = _date.split(' ');
        const time = _day[4].split(':');
        const hour = parseInt(time[0]) - 9;
        const result_time = `${_day[3]}년${en_month[_day[1]]}월 ${
          _day[2]
        }일 ${hour}시 ${time[1]}분 ${time[2]}초`;
        const obj = {
          post_title: post_title,
          post_content: post_content,
          temp_date: result_time,
        };
        return obj;
      },
    );
    this.logger.debug(`getBoardByTitle () : ${JSON.stringify(temp2)}`);
    return temp2;
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