import { IsNumber, IsString } from 'class-validator';

export class UpdateDataDto {
  @IsNumber()
  readonly content_id: number;

  @IsString()
  readonly content: string;
}
