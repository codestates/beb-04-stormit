import { IsNumber, IsString } from 'class-validator';

export class WriteBoardDto {
  @IsString()
  readonly email: string;
  @IsString()
  readonly nickname: string;
  @IsNumber()
  readonly content_id: number;
  @IsString()
  readonly content: string;
}
