import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateDataDto } from './dto/updateData.dto';

import { Board } from '../board/entity/board.entity';
import { Content } from './entity/content.entity';
import { Logger } from '@nestjs/common';
import { BoardRepository } from 'src/board/board.repository';

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
  ): Promise<object> {
    // 게시판이 있다는 가정하에 진행
    // board_id : 1. 자유게시판
    // board_id : 2. 강아지게시판
    // board_id : 3. 고양이게시판
    this.logger.debug(`createContent() : ${JSON.stringify(createContentDto)}`);
    const { post_content, post_title } = createContentDto;
    const contents = new Content();
    contents.post_content = post_content;
    contents.post_title = post_title;
    contents.board = board;
    await this.save(contents);
    const id = { post_id: contents.id };
    return id;
  }
  async deleteContent(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Post with id ${id}`);
    }
    console.log('result', result);
  }
  async updateContent(
    id: number,
    updateDataDto: UpdateDataDto,
    board,
  ): Promise<Content> {
    const { nickname, post_title, post_content } = updateDataDto;

    this.logger.verbose(nickname, post_title, post_content);
    // console.log(`content id: ${}\nparam : ${content}`);
    let content = await this.findOne(id);
    content.post_title = post_title;
    content.post_content = post_content;
    await this.save(content);
    console.log(content);
    return;
  }
}
