import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entity/content.entity';
import { UpdateDataDto } from './dto/updateData.dto';
import { BoardService } from 'src/board/board.service';
import { BoardRepository } from 'src/board/board.repository';
import { Board } from 'src/board/entity/board.entity';
import { UserService } from 'src/auth/user.service';
import { UserRepository } from 'src/auth/user.repository';

@Controller('board/post')
export class ContentController {
  constructor(
    private readonly contentsService: ContentService, // private boardRepository: BoardRepository,
    private readonly userRepository: UserRepository,
  ) {}
  private logger = new Logger('ContentController');

  // 전체 글 가져오기
  @Get('/total')
  getAllContents(): Promise<Content[]> {
    this.logger.verbose(`getAllContents() :`);
    return this.contentsService.getAllContents();
  }
  // 글 상세정보 가져오기
  @Get(':id')
  getContentById(@Param('id') id: number): Promise<object> {
    this.logger.verbose(`getContentById() : ${id}`);
    return this.contentsService.getContentById(id, this.userRepository);
  }
  // 글 쓰기
  @Post('')
  @UsePipes(ValidationPipe)
  async cretaeContent(
    @Body() createContentDto: CreateContentDto,
  ): Promise<object> {
    this.logger.verbose(
      `User $$$ creating a new content. \nPayload: ${JSON.stringify(
        createContentDto,
      )}`,
    );

    return this.contentsService.createContent(
      createContentDto,
      this.userRepository,
    );
  }
  // 글 삭제
  @Delete(':id')
  deleteContent(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.contentsService.deleteContent(id);
  }

  //글 수정
  @Patch(':id')
  @UsePipes(ValidationPipe)
  path(@Param('id') id: number, @Body() updateDataDto: UpdateDataDto) {
    return this.contentsService.updateContent(id, updateDataDto);
  }
  //ParseIntpipe는 숫자로 잘 오는지 체크한다.
}
