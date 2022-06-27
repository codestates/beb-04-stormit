import { IsNumber, IsString } from 'class-validator';

export class UpdateDataDto {
  @IsString()
  readonly board_title: string;

  @IsString()
  readonly post_title: string;

  @IsString()
  readonly post_content: string;
}
