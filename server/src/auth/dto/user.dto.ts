import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  username?: string;
  @IsNotEmpty()
  password?: string;
  @IsNotEmpty()
  nickname?: string;

  hashedRt?: string;

  thirdPartyId?: string;

  thirdPartyToken?:string;

  signupVerifyToken?:string;

  cryptoToken?: string;
}
