import { HttpException, HttpStatus, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import {Tokens} from './security/tokens.type'
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { jwtConstants } from './security/constants'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private config: ConfigService
    ){}

    async registerUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({ 
            where: { username: newUser.username }
        });

        if(userFind) {
            throw new HttpException('duplicated email', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }

    async validateUser(userDTO: UserDTO): Promise<any>{
        let userFind: User = await this.userService.findByFields({
            where: {username: userDTO.username}
        });
        
        if(!userFind){
            throw new UnauthorizedException();
        }

        const validatePassword = await bcrypt.compare(userDTO.password, userFind.password);

        if(!validatePassword){
            throw new UnauthorizedException();
        }
        // const { password, ...result} = userFind;
        // return result;
        const tokens = await this.getTokens(userFind.user_id, userFind.username);
        await this.updateRtHash(userFind.user_id, tokens.refresh_token);
        return tokens;
        
        
        // const payload: Payload = { user_id: userFind.user_id, username: userFind.username }
        // return {
        //     accessToken: this.jwtService.sign(payload)
        // }

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
        const hash = await bcrypt.hash(rt,10);
        await this.userService.updateHashedRt(user_id,hash)

      }


    async tokenValidateUser(payload: Payload): Promise<UserDTO | undefined>{
 
        return await this.userService.findByFields({
            where : { user_id: payload.user_id }
        })
    }

    async getInfoById(username : string): Promise<UserDTO | undefined>{


        const found = await this.userService.findByFields({
            where : {username: username}
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
        
            return token
          }
        
          removeRefreshToken(user_id:number): Promise<any>{
              return this.userService.removeRefreshToken(user_id)
          }
    


    async deleteUser(user_id: number): Promise<any> {
        return this.userService.delete(user_id);

    }
}
