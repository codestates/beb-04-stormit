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
} from '@nestjs/common';
import { UserService } from 'src/auth/user.service';
import { ContentService } from 'src/content/content.service';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { WriteCommentDto } from './dto/write-comment.dto';

@Controller('board/post/comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private readonly contentService: ContentService,
    private readonly userService: UserService,
  ) {}
  private logger = new Logger('ContentController');

  @Get('')
  test() {}
  //댓글 쓰기
  @Post('')
  writeComment(@Body() writeCommentDto: WriteCommentDto): Promise<object> {
    this.logger.debug(`writeComment() : ${writeCommentDto}`);
    return this.commentService.writeComment(
      writeCommentDto,
      this.userService,
      this.contentService,
    );
  }
  // 댓글 삭제
  @Delete('/:id')
  deleteComment(@Param('id', ParseIntPipe) id): Promise<object> {
    return this.commentService.deleteComment(id);
  }

  // 댓글 수정
  @Put('/:id')
  updateComment(
    @Param('id') id: number,
    @Body() updateDateDto: UpdateCommentDto,
  ): Promise<object> {
    this.logger.debug(`updateComment() : ${id}`);
    return this.commentService.updateComment(id, updateDateDto);
  }
}
