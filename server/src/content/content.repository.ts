import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateDataDto } from './dto/updateData.dto';
import { Board } from '../board/entity/board.entity';
import { Content } from './entity/content.entity';
import { Logger } from '@nestjs/common';
import { UserService } from 'src/auth/user.service';
import { Console } from 'console';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
  private logger = new Logger('ContentRepository');
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
    }일 ${hour}:${time[1]}:${time[2]}`;
    return result_time;
  }
  // post_id값에 맞는 하나의 글 가져오기
  async getPostId(id: number): Promise<Content> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Post with id ${id}`);
    }
    return found;
  }

  // 글 쓰기
  async createContent(
    createContentDto: CreateContentDto,
    userService: UserService,
    foundBoard: Board,
  ): Promise<object> {
    // 게시판이 있다는 가정하에 진행
    this.logger.debug(`createContent() : ${JSON.stringify(createContentDto)}`);
    const { post_content, post_title, user_id } = createContentDto;
    const foundUser = await userService.getUserById(user_id);
    if (foundUser) {
      const contents = new Content();
      if (contents) {
        contents.post_content = post_content;
        contents.post_title = post_title;
        contents.board = foundBoard;
        contents.user = foundUser;
        await this.save(contents);
        const id = { success: true, post_id: contents.id };
        return id;
      } else {
        throw new NotFoundException(
          `Please check the input value ${createContentDto}`,
        );
      }
    } else {
      throw new NotFoundException(
        `Please check the input value ${createContentDto}`,
      );
    }
  }

  // 글 삭제
  async deleteContent(id: number): Promise<object> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't delete Post with id ${id}`);
    } else {
      return { success: true };
    }
  }

  //글 수정
  async updateContent(
    id: number,
    updateDataDto: UpdateDataDto,
  ): Promise<object> {
    const { post_title, post_content } = updateDataDto;
    this.logger.log(`updateContent() : ${updateDataDto}`);

    let content = await this.findOne(id);
    if (content) {
      content.post_title = post_title;
      content.post_content = post_content;
      await this.save(content);
      return {
        success: true,
      };
    } else {
      throw new BadRequestException(`ID not found ${id}`);
    }
  }

  // 글 상세정보 가져오기
  async getContentInfoById(
    id: number,
    userService: UserService,
  ): Promise<object> {
    const found_content = await this.findOne(id, {
      relations: ['user', 'board', 'comments'],
    });
    console.log('hi');
    console.log(found_content);
    if (!found_content) {
      throw new BadRequestException(`Can't find Content with id ${id}`);
    }

    const com = found_content.comments.map((value) => {
      const _data = value.created_at.toString();
      const time = this.getTime(_data);
      const comment_content = value.comment_content;
      const comment_id = value.id;
      const comment_created_at = time;
      const comment_nickname = value.user.nickname;
      const obj = {
        comment_content,
        comment_id,
        comment_created_at,
        comment_nickname,
      };
      return obj;
    });
    console.log(com);
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
}
