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
import { EmailService } from './email/email.service';
import { isUUID } from 'class-validator';
import * as uuid from 'uuid';
import cryptoRandomString from 'crypto-random-string';
import * as crypto from 'crypto';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {}

  private async sendMemberJoinEmail(
    email: string,
    signupVerifyToken: string,
  ): Promise<any> {
    return await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급

    const userFind: UserDTO = await this.userService.findByFields({
      where: { signupVerifyToken: signupVerifyToken },
    });

    if (!userFind) {
      throw new Error('User does not exist with related signupVerifyToken');
    }

    return this.userService.updateSignupToken(userFind, null);
  }

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
      console.log('1');
      const jwt: string = sign(payload, jwtConstants.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: 3600,
      });
      console.log('2');
      const userFind: UserDTO = await this.userService.findByFields({
        where: { thirdPartyId: thirdPartyId },
      });
      const userInfo: UserDTO = userFind;
      console.log('3');
      if (!userFind) {
        console.log('4');
        const userDTO = new UserDTO();
        // userDTO.username = 'email';
        userDTO.username = profile.emails[0].value;
        userDTO.password = thirdPartyId;
        userDTO.nickname = profile.displayName;
        userDTO.thirdPartyId = thirdPartyId;
        userDTO.thirdPartyToken = jwt;
        console.log(userDTO);
        await this.registerOAuthUser(userDTO);
        // const userInfo: UserDTO = await this.getInfoByName(userDTO.username);
        // console.log(userInfo);
      } else {
        await this.userService.updateThirdPartyToken(userInfo.username, jwt);
      }

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
    const signupVerifyToken = uuid.v1();

    newUser.signupVerifyToken = signupVerifyToken;
    await this.userService.save(newUser);
    return await this.sendMemberJoinEmail(newUser.username, signupVerifyToken);
  }

  async registerOAuthUser(newUser: UserDTO): Promise<UserDTO> {
    console.log(newUser);
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
    if (!userFind) {
      throw new UnauthorizedException();
    }

    const validatePassword = await bcrypt.compare(
      body.current_password,
      userFind.password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException();
    } else {
      const result = await this.userService.updatePassword(
        userFind,
        body.new_password,
      );
      return result;
    }
  }

  async findPassword(userDTO: UserDTO): Promise<any> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { username: userDTO.username },
    });

    if (!userFind) {
      throw new HttpException(
        'there is no user with this email',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const token = cryptoRandomString({ length: 20, type: 'base64' });
    const token = crypto.randomBytes(10).toString('hex');

    await this.userService.updateCryptoToken(userFind, token);
    return await this.emailService.sendFindPasswordVerification(
      userFind.username,
      token,
    );
  }

  async resetPassword(userDTO: UserDTO): Promise<any> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { cryptoToken: userDTO.cryptoToken },
    });
    // console.log(userDTO);
    // console.log(userFind);

    if (!userFind) {
      throw new HttpException(
        `there is no matched user info with username ${userDTO.username}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const new_password = userDTO.cryptoToken;
    return await this.userService.updatePassword(userFind, new_password);
  }

  async validateUser(userDTO: UserDTO): Promise<any> {
    const userFind: User = await this.userService.findByFields({
      where: { username: userDTO.username, signupVerifyToken: null },
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
