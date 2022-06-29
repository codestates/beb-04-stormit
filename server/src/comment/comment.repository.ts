import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/auth/user.service';
import { ContentService } from 'src/content/content.service';
import { Content } from 'src/content/entity/content.entity';
import { EntityRepository, Repository } from 'typeorm';
import { WriteCommentDto } from './dto/write-comment.dto';
import { Comment } from './entity/comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  private logger = new Logger('CommentRepository');

  // 댓글 쓰기
  async writeComment(
    writeCommentDto: WriteCommentDto,
    userService: UserService,
    contentService: ContentService,
  ): Promise<object> {
    this.logger.debug(`writeComment()`);
    // post_id를 통해 게시글을 찾는다.
    // user_id를 통해 유저를 찾는다.
    // comment_content를 post_id에 연결한다.
    const { user_id, post_id, comment_content } = writeCommentDto;
    const found_user = await userService.getUserById(user_id);
    const found_post = await contentService.getPostId(post_id);
    console.log(JSON.stringify(found_post));

    if (!found_user) {
      throw new BadRequestException(`User ID not found. : ${user_id}`);
    }
    if (!found_post) {
      throw new BadRequestException(`Post ID not found. : ${post_id}`);
    }

    const comment = new Comment();

    comment.comment_content = comment_content;
    comment.user = found_user;
    comment.content = found_post;

    await this.save(comment);
    return { success: true, comment_id: comment.id };
  }

  // 댓글 삭제
  async deleteComment(id: number): Promise<object> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't delete comment with id ${id}`);
    } else {
      return { success: true };
    }
  }

  async getUserNickname(id: number): Promise<string> {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new BadRequestException(`Comment ID ${id} Not Found`);
    } else {
      console.log(comment.user.nickname);
      return '';
    }
  }
}
