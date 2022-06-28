import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Tokens } from './security/tokens.type';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { jwtConstants } from './security/constants';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateOAuthLogin(
    profile: any,
    thirdPartyId: string,
    provider: Provider,
  ): Promise<any> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // console.log(thirdPartyId);
      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);
      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, jwtConstants.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: 3600,
      });

      const userFind: UserDTO = await this.userService.findByFields({
        where: { thirdPartyId: thirdPartyId },
      });
      const userInfo: UserDTO = userFind;
      if (!userFind) {
        const userDTO = new UserDTO();
        // userDTO.username = 'email';
        userDTO.username = profile.emails[0];
        userDTO.password = thirdPartyId;
        userDTO.nickname = profile.displayName;
        userDTO.thirdPartyId = thirdPartyId;
        userDTO.thirdPartyToken = jwt;
        console.log('debug');
        await this.registerUser(userDTO);
        const userInfo: UserDTO = await this.getInfoByName(userDTO.username);
        console.log(userInfo);
      } else {
        await this.userService.updateThirdPartyToken(userInfo.username, jwt);
      }

      // if(!userFind) {
      //     user = await this.userService.
      // }

      // let newUser: UserDTO = UserDTO(
      //     "username" : thirdPartyId
      // )
      // return await this.userService.save(newUser);

      return { jwt, userInfo };
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async registerUser(newUser: UserDTO): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { username: newUser.username },
    });

    if (userFind) {
      throw new HttpException('duplicated email', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.save(newUser);
  }

  async verifyPassword(user_id: number, body: any): Promise<any> {
    const userFind: User = await this.userService.findByFields({
      where: { user_id: user_id },
    });
  }

  async validateUser(userDTO: UserDTO): Promise<any> {
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
    return userFind;
  }

  async validateThirdPartyUser(
    userDTO: UserDTO,
    ThirdPartyId: string,
  ): Promise<any> {
    const userFind: User = await this.userService.findByFields({
      where: { username: userDTO.username },
    });

    if (!userFind) {
      throw new UnauthorizedException();
    }

    const validatePassword = await bcrypt.compare(
      ThirdPartyId,
      userFind.password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException();
    }
    return userFind;
  }

  async getTokens(user_id: number, username: string): Promise<Tokens> {
    const jwtPayload: Payload = {
      user_id: user_id,
      username: username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: `${jwtConstants.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: `${jwtConstants.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(user_id: number, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt, 10);
    await this.userService.updateHashedRt(user_id, hash);
  }

  async tokenValidateUser(payload: Payload): Promise<UserDTO | undefined> {
    return await this.userService.findByFields({
      where: { user_id: payload.user_id },
    });
  }

  async getInfoById(user_id: number): Promise<UserDTO | undefined> {
    const found = await this.userService.findByFields({
      where: { user_id: user_id },
    });
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${user_id}`);
    } else {
      return found;
    }
  }

  async getInfoByName(username: string): Promise<UserDTO | undefined> {
    const found = await this.userService.findByFields({
      where: { username: username },
    });
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${username}`);
    } else {
      return found;
    }
  }

  getJwtAccessToken(user_id: number) {
    const payload = { user_id };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${jwtConstants.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
    });

    return token;
  }

  removeRefreshToken(user_id: number): Promise<any> {
    return this.userService.removeRefreshToken(user_id);
  }

  async deleteUser(user_id: number): Promise<any> {
    return this.userService.delete(user_id);
  }
}
