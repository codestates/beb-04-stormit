import { Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  private logger = new Logger('BoardRepository');
  private en_month = {
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
  private coinList = ['bitcoin', 'ethereum', 'solana'];
  async getBoardById(id: number) {
    const found = await this.findOne(id, { relations: ['contents'] });
    this.logger.debug(`getBoardById() : ${JSON.stringify(found)}`);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    } else {
      return found;
    }
  }

  async setBoardTitle() {
    this.coinList.map((value) => {
      const title = this.create({ board_title: value });
      this.save(title);
    });
  }
  getTime(_date: string): string {
    const _day = _date.split(' ');
    const time = _day[4].split(':');
    const hour = parseInt(time[0]);
    const result_time = `${_day[3]}년 ${this.en_month[_day[1]]}월 ${
      _day[2]
    }일 ${hour}시 ${time[1]}분 ${time[2]}초`;
    return result_time;
  }
  async getBoardByTitle(_board_title: string): Promise<object> {
    const found = await this.findOne(
      {
        board_title: _board_title,
      },
      {
        relations: ['contents'],
      },
    );

    this.logger.debug(`getBoardByTitle () : ${JSON.stringify(_board_title)}`);
    this.logger.debug(`getBoardByTitle () : ${JSON.stringify(found)}`);
    if (found) {
      const result = found.contents.map(
        ({ post_content, post_title, created_at }) => {
          const _date = created_at.toString();
          const time = this.getTime(_date);
          const obj = {
            post_title: post_title,
            post_content: post_content,
            created_at: time,
          };
          return obj;
        },
      );
      this.logger.debug(`getBoardByTitle () : ${JSON.stringify(result)}`);
      return result;
    } else {
      throw new NotFoundException(`Board not found : ${_board_title} `);
    }
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { board_title } = createBoardDto;

    const board = this.create({
      board_title,
    });
    this.logger.debug(`createBoard() : ${board_title}`);
    const result = await this.save(board);
    return result;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    this.logger.debug(`deleteBoard() : ${JSON.stringify(result)}`);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
}
