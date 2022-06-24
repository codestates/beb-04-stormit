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

  async getContentById(id: number): Promise<Content> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Post with id ${id}`);
    }
    return found;
  }

  async createContent(
    createContentDto: CreateContentDto,
    board: Board,
  ): Promise<string> {
    // 게시판이 있다는 가정하에 진행
    // board_id : 1. 자유게시판
    // board_id : 2. 강아지게시판
    // board_id : 3. 고양이게시판

    // (body){
    //   ”email” : example@gmail.com,
    //   ”post_content” : content,(내용)
    //   ”board_title”:”board_title”(게시판 이름)
    //   ”post_title”(게시글 제목)
    //   }
    this.logger.debug(`createContent() : ${JSON.stringify(createContentDto)}`);
    const { post_content, post_title } = createContentDto;
    const contents = new Content();
    contents.post_content = post_content;
    contents.post_title = post_title;
    contents.board = board;
    await this.save(contents);
    // this.logger.debug(`createContent() : ${JSON.stringify(contents)}`);

    return '';
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
  ): Promise<Content> {
    const { email, board_name, post_name, post_content } = updateDataDto;
    this.logger.verbose(email, board_name, post_name, post_content);
    // console.log(`content id: ${}\nparam : ${content}`);
    // const board = await this.getBoardById(id);
    // // this.deleteBoard(id);
    // await this.save();
    // insert로 업데이트하기
    return;
  }
}
