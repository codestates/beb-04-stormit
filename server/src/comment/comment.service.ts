import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user.service';
import { ContentService } from 'src/content/content.service';
import { CommentRepository } from './comment.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { WriteCommentDto } from './dto/write-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}
  private logger = new Logger('CommentService');

  writeComment(
    writeCommentDto: WriteCommentDto,
    userService: UserService,
    contentService: ContentService,
  ): Promise<object> {
    return this.commentRepository.writeComment(
      writeCommentDto,
      userService,
      contentService,
    );
  }

  // 댓글 삭제
  deleteComment(id: number): Promise<object> {
    return this.commentRepository.deleteComment(id);
  }

  getUserNickname(id: number): Promise<string> {
    return this.commentRepository.getUserNickname(id);
  }
  //댓글 수정
  updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
    contentService: ContentService,
  ): Promise<object> {
    return this.commentRepository.updateComment(
      id,
      updateCommentDto,
      contentService,
    );
  }
}
