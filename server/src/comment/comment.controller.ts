import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/auth/user.service';
import { ContentService } from 'src/content/content.service';
import { CommentService } from './comment.service';
import { WriteCommentDto } from './dto/write-comment.dto';

@Controller('board/post/comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private readonly contentService: ContentService,
    private readonly userService: UserService,
  ) {}
  private logger = new Logger('ContentController');

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

  @Delete('/:id')
  deleteComment(@Param('id', ParseIntPipe) id): Promise<object> {
    return this.commentService.deleteComment(id);
  }
}
