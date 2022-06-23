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

@Controller('board')
export class ContentController {
  constructor(private contentsService: ContentService) {}
  private logger = new Logger('ContentController');
  // 전체 글 가져오기
  @Get()
  getAllContents(): Promise<Content[]> {
    this.logger.verbose(`User ### trying to get all contents `);
    return this.contentsService.getAllContents();
  }
  // 글 상세정보 가져오기
  @Get('/post/:id')
  getContentById(@Param('id') id: number): Promise<Content> {
    return this.contentsService.getContentById(id);
  }
  // 글 쓰기
  @Post('/post')
  @UsePipes(ValidationPipe)
  cretaeContent(@Body() createContentDto: CreateContentDto): Promise<string> {
    this.logger.verbose(
      `User $$$ creating a new content. \nPayload: ${JSON.stringify(
        createContentDto,
      )}`,
    );
    return this.contentsService.createContent(createContentDto);
  }
  // 글 삭제
  @Delete('/post/:id')
  deleteContent(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.contentsService.deleteContent(id);
  }

  //글 수정
  // put, patch차이
  // put은 일부분만 수정 후 받지 않은 값에 대해서는 null
  // patch는 일부분만 수정한 경우 일부부만 수정되어 전달한다.
  @Patch('/post/:id')
  @UsePipes(ValidationPipe)
  path(@Param('id') id: number, @Body() updateDataDto: UpdateDataDto) {
    return this.contentsService.updateContent(id, updateDataDto);
  }
  //ParseIntpipe는 숫자로 잘 오는지 체크한다.
}
