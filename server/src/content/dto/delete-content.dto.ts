import { IsNumber, IsString } from 'class-validator';

export class deleteContentDto {
  @IsString()
  readonly email: string;
  @IsNumber()
  readonly content_id: number;
}
