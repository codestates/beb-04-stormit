
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from '../../auth.service';

import * as config from 'config';

const ouathConfig = config.get('oauth')

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
      private readonly authService: AuthService
  ) {
    super({
      clientID: ouathConfig.GOOGLE_CLIENT_ID , // CLIENT_ID
      clientSecret:  ouathConfig.GOOGLE_CLIENT_SECRET , // CLIENT_SECRET
      callbackURL: 'http://localhost:4000/user/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }
  // @nestjs/passport PassportStrategy를 상속
  // passport-google-oauth20 Strategy 사용
  // Strategy의 이름은 'google'로 지정
  // validate 함수 내에서, 성공적인 google 로그인에 대한 유효성 검증
  // google에서 보내주는 'profile' 정보만 로그로 기록
 

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: any,
  ) {
    try {
      console.log(profile);

      const jwt = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
      const user = {
        jwt,
      };
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  }
}
