import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
  private logger = new Logger('ContentService');
  async getAllContents(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  async getContentById(id: number): Promise<Content> {
    const found = await this.contentRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    } else {
      this.logger.log(JSON.stringify(found));
      const { post_title, post_content, created_at } = found;
      const nickname = 'fdongfdong';
      const comment_nickname = 'comment_nickname';
      const comment_content = '댓글입니다.';
      const comment_id = 1;
      const result = {
        post_title,
        post_content,
        created_at,
        nickname,
        comment: { comment_nickname, comment_content, comment_id },
      };
      this.logger.log(JSON.stringify(result));
      // {"id":1,"user_id":1,"board_id":1,"post_title":"spefkap1ㅈㄷㄹㄴㅇㅈㄷㄹㅈㄷㄹㄹㄴㅇㄹ23","post_content":"내용임","created_at":"2022-06-22T17:50:19.849Z"}
      // return result 하고 싶은데... entity에 정의된 값들이 아니라 리턴을 못함.. 리턴을하려면?
    }

    return found;
  }
  createContent(createContentDto: CreateContentDto): Promise<string> {
    return this.contentRepository.createContent(createContentDto); // repository 패턴
  }

  async deleteContent(id: number): Promise<void> {
    this.contentRepository.deleteContent(id);
  }

  async updateContent(
    id: number,
    updateDataDto: UpdateDataDto,
  ): Promise<Content> {
    return this.contentRepository.updateContent(id, updateDataDto);
  }
}

// ORM에서는 remove, delete 메서드가 있다.
// remove: 무조건 존재하는 아이템을 remove 메소드를 이용햇 지워줘야한다. 그렇지 않으면 404 Error
// remove로 지우려면 1.아이템이 있는지 한번 찾아보기  2. 아이템 지우기 2번 데이터베이스를 이용해야한다.
// delete: 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없다.
