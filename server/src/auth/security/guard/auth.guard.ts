import { jwtConstants } from '../constants';
import { ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from "@nestjs/passport"
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard extends NestAuthGuard('jwt'){
    constructor(private jwtService: JwtService){
        super();
    }
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
    
        const { authorization } = request.headers;
    
        if (authorization === undefined) {
          throw new HttpException('Token 전송 안됨', HttpStatus.UNAUTHORIZED);
        }
    
        const token = authorization.replace('Bearer ', '')
        request.user = this.validateToken(token);
        return true;
      }
    
      validateToken(token: string) {
        const secretKey = jwtConstants.JWT_ACCESS_TOKEN_SECRET
    
        try {
          const verify = this.jwtService.verify(token, { secret: secretKey });
          const {user_id} = verify;
          
          return {user_id: user_id};
        } catch (e) {
            console.log(e.message)
          switch (e.message) {
            // 토큰에 대한 오류를 판단합니다.
            case 'INVALID_TOKEN':
            case 'TOKEN_IS_ARRAY':
            case 'NO_USER':
              throw new HttpException('유효하지 않은 토큰입니다.', 401);
    
            case 'jwt expired':
              throw new HttpException('token expired', 401);
            
            case 'jwt malformed':
                throw new HttpException('token expired', 401);
                
            default:
              throw new HttpException('서버 오류입니다.', 500);
          }
        }
      }
    }

