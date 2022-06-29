import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
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
  // private coinList = ['bitcoin', 'ethereum', 'solana'];

  async getBoardInfo(): Promise<object> {
    const board = await this.find({
      relations: ['contents'],
    });
    if (!board) {
      throw new BadRequestException(`The bulletin board does not exist.`);
    }
    const obj = board.map((value) => {
      // console.log(value);

      const contents = value.contents;

      const content_set = contents.map((content) => {
        const post_title = content.post_title;
        const post_content = content.post_content;
        const post_id = content.id;
        const likes = content.recommendations;
        const view = content.views;
        const nickname = content.user.nickname;
        const created_at = this.getTime(content.created_at.toString());
        const comment_count = content.comments.length;
        const board_title = content.board.board_title;
        return {
          post_title,
          post_content,
          post_id,
          nickname,
          created_at,
          comment_count,
          board_title,
          likes,
          view,
        };
      });
      // console.log(content_set);
      return content_set;
    });
    const data = new Array(0);
    obj.forEach((value) => {
      value.forEach((index) => {
        console.log(index);
        data.push(index);
      });
    });

    return data;
  }

  async getBoardById(id: number) {
    const found = await this.findOne(id, { relations: ['contents'] });
    this.logger.debug(`getBoardById() : ${JSON.stringify(found)}`);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    } else {
      return found;
    }
  }

  getTime(_date: string): string {
    const _day = _date.split(' ');
    const time = _day[4].split(':');
    const hour = parseInt(time[0]);
    const result_time = `${_day[3]}년 ${this.en_month[_day[1]]}월 ${
      _day[2]
    }일 ${hour}:${time[1]}:${time[2]}`;
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
        ({
          post_content,
          post_title,
          created_at,
          id,
          comments,
          recommendations,
          views,
        }) => {
          const _date = created_at.toString();
          const time = this.getTime(_date);
          const obj = {
            post_id: id,
            post_title: post_title,
            post_content: post_content,
            created_at: time,
            comment_count: comments.length,
            likes: recommendations,
            view: views,
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
