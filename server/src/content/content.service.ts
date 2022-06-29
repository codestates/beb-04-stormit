import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user.service';
import { BoardService } from 'src/board/board.service';
import { ContentRepository } from './content.repository';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateDataDto } from './dto/updateData.dto';
import { Content } from './entity/content.entity';
@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}
  // private readonly boardsService: BoardService,
  private logger = new Logger('ContentService');
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
  getTime(_date: string): string {
    const _day = _date.split(' ');
    const time = _day[4].split(':');
    const hour = parseInt(time[0]);
    const result_time = `${_day[3]}년 ${this.en_month[_day[1]]}월 ${
      _day[2]
    }일 ${hour}시 ${time[1]}분 ${time[2]}초`;
    return result_time;
  }

  // 전체 글 가져오기
  async getAllContents(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  // 글 상세정보 가져오기
  async getContentById(id: number, userService: UserService): Promise<object> {
    const found_content = await this.contentRepository.findOne(id, {
      relations: ['user', 'board', 'comments'],
    });
    const com = found_content.comments.map((value) => {
      const _data = value.create_at.toString();
      const time = this.getTime(_data);
      const comment_content = value.comment_content;
      const comment_id = value.id;
      const comment_created_at = time;

      const obj = { comment_content, comment_id, comment_created_at };
      return obj;
    });
    console.log(com);
    if (!found_content) {
      throw new BadRequestException(`Can't find Content with id ${id}`);
    }
    const {
      post_title,
      post_content,
      created_at,
      user: { nickname },
      board: { board_title },
      // comments,
    } = found_content;

    const user = await userService.getUserByNickname(nickname);
    if (user) {
      const _nickname = user.nickname;
      const _date = created_at.toString();
      const time = this.getTime(_date);
      const obj = {
        board_title: board_title,
        post_title: post_title,
        post_content: post_content,
        created_at: time,
        nickname: _nickname,
        comments: com,
      };
      this.logger.log(`${JSON.stringify(obj)}`);
      return obj;
    } else {
      throw new BadRequestException(
        `User not found.
          ${nickname}`,
      );
    }
  }

  // 글 쓰기
  async createContent(
    createContentDto: CreateContentDto,
    userService: UserService,
    boardService: BoardService,
  ): Promise<object> {
    const { board_title } = createContentDto;
    let board_id = 0;
    if (board_title === 'bitcoin') {
      board_id = 1;
    } else if (board_title === 'ethereum') {
      board_id = 2;
    } else if (board_title === 'solana') {
      board_id = 3;
    } else {
      board_id = 0;
    }
    const foundBoard = await boardService.getBoardById(board_id);
    if (!foundBoard) {
      throw new BadRequestException(`The board could not be found.`);
    }
    return this.contentRepository.createContent(
      createContentDto,
      userService,
      foundBoard,
    );
  }

  // 글 삭제
  async deleteContent(id: number): Promise<object> {
    return this.contentRepository.deleteContent(id);
  }

  //글 수정
  async updateContent(
    id: number,
    updateDataDto: UpdateDataDto,
    boardService: BoardService,
  ): Promise<object> {
    const { board_title } = updateDataDto;
    let board_id = 1;
    if (board_title === 'ethereum') {
      board_id = 2;
    } else if (board_title === 'solana') {
      board_id = 3;
    } else {
      board_id = 0;
    }
    const found_board = await boardService.getBoardById(board_id);
    if (found_board) {
      return this.contentRepository.updateContent(id, updateDataDto);
    } else {
      throw new BadRequestException('Board not found.');
    }
  }
  getPostId(post_id: number): Promise<Content> {
    return this.contentRepository.getPostId(post_id);
  }
}
