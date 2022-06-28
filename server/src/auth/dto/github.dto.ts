import { IsString } from 'class-validator';

export class GithubDto {
  @IsString()
  readonly code: string;
}
