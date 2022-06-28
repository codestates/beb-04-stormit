// (body){
//   ”user_Id”: “user_id”
//   ”post_id”: “post_id”,
//   ”comment_content” : “comment_content”
//   }

import { IsNumber, IsString } from 'class-validator';

export class WriteCommentDto {
  @IsNumber()
  readonly user_id: number;

  @IsNumber()
  readonly post_id: number;

  @IsString()
  readonly comment_content: string;
}
