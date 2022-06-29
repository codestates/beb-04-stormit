import { IsNotEmpty } from 'class-validator';

export class VerifyEmailDTO {
  @IsNotEmpty()
  signupVerifyToken?: string;

}
