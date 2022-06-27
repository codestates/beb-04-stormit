import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtStrategy } from './security/strategy/passport.jwt.strategy';
import { JwtRefreshStrategy } from './security/strategy/jwt-refresh.strategy';
import { jwtConstants } from './security/constants';
import { GoogleStrategy } from './security/strategy/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: jwtConstants.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: `${jwtConstants.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
      },
    }),
    PassportModule,
  ],
  exports: [TypeOrmModule, JwtModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, UserService, JwtStrategy, JwtRefreshStrategy]

})
export class AuthModule {}
