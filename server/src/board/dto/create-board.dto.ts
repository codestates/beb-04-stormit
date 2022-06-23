import { IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  readonly board_title: string;
}
