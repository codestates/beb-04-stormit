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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entity/content.entity';
import { UpdateDataDto } from './dto/updateData.dto';
import { BoardService } from 'src/board/board.service';

import { UserService } from 'src/auth/user.service';
import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from 'src/auth/get-user.decorator';

@Controller('board/post') // @UseGuards(AuthGuard())
export class ContentController {
  constructor(
    private readonly contentsService: ContentService,
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}
  private logger = new Logger('ContentController');

  @Get('/total')
  getAllContents(): Promise<Content[]> {
    this.logger.debug(`getAllContents()`);
    return this.contentsService.getAllContents();
  }

  // 글 상세정보 가져오기
  @Get('/:id')
  getContentById(@Param('id') id: number): Promise<object> {
    this.logger.debug(`getContentById() : ${id}`);
    return this.contentsService.getContentById(id, this.userService);
  }

  // 글 쓰기
  @Post('')
  @UsePipes(ValidationPipe)
  async cretaeContent(
    @Body() createContentDto: CreateContentDto,
  ): Promise<object> {
    this.logger.debug(`cretaeContent() : ${createContentDto}`);
    return this.contentsService.createContent(
      createContentDto,
      this.userService,
      this.boardService,
    );
  }

  // 글 삭제
  @Delete('/:id')
  deleteContent(@Param('id', ParseIntPipe) id): Promise<object> {
    this.logger.debug(`deleteContent()`);
    return this.contentsService.deleteContent(id);
  }

  //글 수정
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  path(
    @Param('id') id: number,
    @Body() updateDataDto: UpdateDataDto,
  ): Promise<object> {
    this.logger.debug(`updateDataDto() : ${updateDataDto}`);
    return this.contentsService.updateContent(
      id,
      updateDataDto,
      this.boardService,
    );
  }
  //ParseIntpipe는 숫자로 잘 오는지 체크한다.
}
