import { IsNumber, IsString } from 'class-validator';

export class editPostDto {
  @IsString()
  readonly email: string;
  @IsNumber()
  readonly content_id: number;
  @IsString()
  readonly content: string;
}
