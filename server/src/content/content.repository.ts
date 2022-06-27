import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateDataDto } from './dto/updateData.dto';

import { Board } from '../board/entity/board.entity';
import { Content } from './entity/content.entity';
import { Logger } from '@nestjs/common';
import { BoardRepository } from 'src/board/board.repository';
import { UserService } from 'src/auth/user.service';
import { UserRepository } from 'src/auth/user.repository';
import e from 'express';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
  private logger = new Logger('ContentRepository');

  async getContentById(id: number): Promise<object> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Post with id ${id}`);
    }
    return found;
  }

  async createContent(
    createContentDto: CreateContentDto,
    board: Board,
    user: UserRepository,
  ): Promise<object> {
    // 게시판이 있다는 가정하에 진행
    // board_id : 1. 자유게시판
    // board_id : 2. 일간게시판
    // board_id : 3. 주간게시판
    this.logger.debug(`createContent() : ${JSON.stringify(createContentDto)}`);

    const { post_content, post_title, user_id } = createContentDto;
    const user_result = await user.getUserById(user_id);
    if (user_result) {
      const contents = new Content();
      if (contents) {
        contents.post_content = post_content;
        contents.post_title = post_title;
        contents.board = board;
        contents.user = user_result;
        await this.save(contents);
        const id = { post_id: contents.id };
        return id;
      } else {
        throw new NotFoundException(
          `Can't Create Post with id ${createContentDto}`,
        );
      }
    } else {
      throw new NotFoundException(
        `Can't Create Post with id ${createContentDto}`,
      );
    }
  }
  async deleteContent(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't delete Post with id ${id}`);
    }
    console.log('result', result);
  }
  async updateContent(
    id: number,
    updateDataDto: UpdateDataDto,
    board,
  ): Promise<Content> {
    const { post_title, post_content } = updateDataDto;

    this.logger.verbose(post_title, post_content);
    // console.log(`content id: ${}\nparam : ${content}`);
    let content = await this.findOne(id);
    if (content) {
      content.post_title = post_title;
      content.post_content = post_content;
      await this.save(content);
      console.log(content);
      return;
    } else {
      throw new NotFoundException(`Can't update `);
    }
  }
}
