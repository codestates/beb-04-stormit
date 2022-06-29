import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entity/content.entity';
import { UpdateDataDto } from './dto/updateData.dto';
import { BoardService } from 'src/board/board.service';
import { UserService } from 'src/auth/user.service';
import { RecommendationsContentDto } from './dto/recommendations-content.dto';

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
  @UsePipes(ValidationPipe)
  getContentInfoById(@Param('id') id: number): Promise<object> {
    this.logger.debug(`getContentById() : ${id}`);
    return this.contentsService.getContentInfoById(id, this.userService);
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
  @UsePipes(ValidationPipe)
  async deleteContent(@Param('id', ParseIntPipe) id): Promise<object> {
    this.logger.debug(`deleteContent()`);

    return this.contentsService.deleteContent(id);
  }

  //글 수정
  @Put('/:id')
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

  // 추천수 증가
  @Get('/thumbup/:id')
  getRecommendationsIncrease(@Param('id') id: number): Promise<object> {
    return this.contentsService.getRecommendationsIncrease(id);
  }

  // 추천수 감소
  @Get('/thumbdown/:id')
  getRecommendationsDecrease(@Param('id') id: number): Promise<object> {
    return this.contentsService.getRecommendationsDecrease(id);
  }
  @Get('/view/:id')
  getViews(@Param('id') id: number): Promise<object> {
    return this.contentsService.getViews(id);
  }
}
