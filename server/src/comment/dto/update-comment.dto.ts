import { IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  readonly comment_content: string;
}
