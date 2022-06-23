import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateDataDto } from './dto/updateData.dto';

import { Content } from './entity/content.entity';
import { Logger } from '@nestjs/common';
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

  async createContent(createContentDto: CreateContentDto): Promise<string> {
    const { email, post_title, post_content, board_title } = createContentDto;
    const result_content = this.create({
      user_id: 1,
      board: { board_title: 'ig' },
      post_content: 'hi',
      post_title: '제목',
    });
    this.logger.log(`==> ${JSON.stringify(result_content)}`);
    // const result_content = this.create({
    //   user_id: 1,
    //   board_id: 1,
    //   post_title,
    //   post_content,
    // });
    // const result_content = '';
    await this.save(result_content);
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

// export class DeleteBoard extends Repository<Board> {

// }
