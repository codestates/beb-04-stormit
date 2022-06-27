import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from 'src/auth/user.repository';

import { BoardService } from 'src/board/board.service';

import { ContentRepository } from './content.repository';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateDataDto } from './dto/updateData.dto';
import { Content } from './entity/content.entity';

@Injectable()
export class ContentService {
  constructor(
    // private boardRepository: BoardRepository,

    private boardService: BoardService,
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}
  // private readonly boardsService: BoardService,
  private logger = new Logger('ContentService');

  async getAllContents(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  async getContentById(
    id: number,
    userRepository: UserRepository,
  ): Promise<object> {
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

    const found_content = await this.contentRepository.findOne(id);

    if (!found_content) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    } else {
      // 닉네임을 받았음 -> 닉네임으로 유저 검색해서 해당 유저를 가져와야함

      const { post_title, post_content, created_at, nickname } = found_content;
      console.log(nickname);
      const user = await userRepository.getUserByNickname(nickname);
      if (user) {
        const temp = user.nickname;
        console.log(temp);
        const _date = created_at.toString();
        const _day = _date.split(' ');
        const time = _day[4].split(':');
        const hour = parseInt(time[0]);
        const result_time = `${_day[3]}년${en_month[_day[1]]}월 ${
          _day[2]
        }일 ${hour}시 ${time[1]}분 ${time[2]}초`;
        const obj = {
          post_title: post_title,
          post_content: post_content,
          temp_date: result_time,
          nickname: temp,
        };

        console.log(obj);
        this.logger.log(`${JSON.stringify(obj)}`);
        return obj;
      } else {
        throw new NotFoundException(``);
      }
    }
  }
  async createContent(
    createContentDto: CreateContentDto,
    userRepository: UserRepository,
  ): Promise<object> {
    const { board_title } = createContentDto;
    let board_id = 1;
    if (board_title === '일간게시판') {
      board_id = 2;
    } else if (board_title === '주간게시판') {
      board_id = 3;
    } else {
      board_id = 1;
    }
    const board = await this.boardService.getBoardById(board_id);
    return this.contentRepository.createContent(
      createContentDto,
      board,
      userRepository,
    ); // repository 패턴
  }

  async deleteContent(id: number): Promise<void> {
    this.contentRepository.deleteContent(id);
  }

  async updateContent(
    id: number,
    updateDataDto: UpdateDataDto,
  ): Promise<Content> {
    const { board_title } = updateDataDto;
    let board_id = 1;
    if (board_title === '일간게시판') {
      board_id = 2;
    } else if (board_title === '주간게시판') {
      board_id = 3;
    } else {
      board_id = 1;
    }
    const board = await this.boardService.getBoardById(board_id);
    return this.contentRepository.updateContent(id, updateDataDto, board);
  }
}

// ORM에서는 remove, delete 메서드가 있다.
// remove: 무조건 존재하는 아이템을 remove 메소드를 이용햇 지워줘야한다. 그렇지 않으면 404 Error
// remove로 지우려면 1.아이템이 있는지 한번 찾아보기  2. 아이템 지우기 2번 데이터베이스를 이용해야한다.
// delete: 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없다.
