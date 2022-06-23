import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateDataDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly board_name: string;

  @IsString()
  readonly post_name: string;

  @IsString()
  readonly post_content: string;
}
