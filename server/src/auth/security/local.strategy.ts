import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userDTO: UserDTO): Promise<any> {
    const user = await this.authService.validateUser(userDTO);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
