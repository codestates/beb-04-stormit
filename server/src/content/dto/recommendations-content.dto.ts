import { IsNumber, IsString } from 'class-validator';

export class RecommendationsContentDto {
  @IsNumber()
  readonly recommendations: number;
  @IsNumber()
  readonly post_id: number;
}
