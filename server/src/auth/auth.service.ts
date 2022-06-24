import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(newUser: UserDTO): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { username: newUser.username },
    });

    if (userFind) {
      throw new HttpException('duplicated email', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.save(newUser);
  }

  async validateUser(
    userDTO: UserDTO,
  ): Promise<{ accessToken: string } | undefined> {
    const userFind: User = await this.userService.findByFields({
      where: { username: userDTO.username },
    });

    if (!userFind) {
      throw new UnauthorizedException();
    }

    const validatePassword = await bcrypt.compare(
      userDTO.password,
      userFind.password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException();
    }

    const payload: Payload = {
      user_id: userFind.user_id,
      username: userFind.username,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async tokenValidateUser(payload: Payload): Promise<UserDTO | undefined> {
    return await this.userService.findByFields({
      where: { user_id: payload.user_id },
    });
  }

  async getInfoById(username: string): Promise<UserDTO | undefined> {
    const found = await this.userService.findByFields({
      where: { username: username },
    });
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${username}`);
    } else {
      return found;
    }
  }

  async deleteUser(user_id: number): Promise<void> {
    this.userService.delete(user_id);
  }
}
