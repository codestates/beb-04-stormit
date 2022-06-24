import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { BoardRepository } from 'src/board/board.repository';
import { BoardService } from 'src/board/board.service';
import { Board } from 'src/board/entity/board.entity';

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

  async getContentById(id: number): Promise<Content> {
    // console.log(await this.boardService.getBoardById('2'));
    const found = await this.contentRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    } else {
      this.logger.log(JSON.stringify(found));
    }

    return found;
  }
  async createContent(createContentDto: CreateContentDto): Promise<string> {
    const { board_title } = createContentDto;
    let board_id = 1;
    if (board_title === '강아지게시판') {
      board_id = 2;
    } else if (board_title === '고양이게시판') {
      board_id = 3;
    } else {
      board_id = 1;
    }
    const board = await this.boardService.getBoardById(board_id);
    return this.contentRepository.createContent(createContentDto, board); // repository 패턴
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
