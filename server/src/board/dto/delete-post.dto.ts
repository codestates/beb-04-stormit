import { IsNumber, IsString } from 'class-validator';

export class deletePostDto {
  @IsString()
  readonly email: string;
  @IsNumber()
  readonly content_id: number;
}
