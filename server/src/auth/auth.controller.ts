import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { VerifyEmailDTO } from './dto/verifyEmail.dto';
import { AuthGuard } from './security/guard/auth.guard';
import { JwtRefreshGuard } from './security/guard/jwt-refresh.guard';
import { LocalAuthGuard } from './security/guard/local-auth.guard';
import { UserService } from './user.service';
import { GoogleAuthGuard } from './security/guard/google-auth-guard';

@Controller('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async registerAccount(
    @Req() req: Request,
    @Body() UserDTO: UserDTO,
  ): Promise<any> {
    const data = await this.authService.registerUser(UserDTO);
    return { success: true, data };
  }

  @Post('find-password')
  async findPassowrd(
    @Req() req: Request,
    @Body() UserDTO: UserDTO,
  ): Promise<any> {
    return await this.authService.findPassword(UserDTO);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    // console.log(req.user);
    const jwt: string = req.user.jwt;
    if (jwt)
      res.redirect('http://localhost:3000/user/google/success?jwt=' + jwt);
    else res.redirect('http://localhost:3000/login/failure');
  }

  @Post('google/success/:token')
  async googleLoginPost(
    @Req() req: Request,
    @Param('token') token: string,
    @Res() res: Response,
  ): Promise<any> {
    const userDTO: UserDTO = await this.userService.findByFields({
      where: { thirdPartyToken: token },
    });

    const user = await this.authService.validateThirdPartyUser(
      userDTO,
      userDTO.thirdPartyId,
    );

    const jwt = await this.authService.getTokens(user.user_id, user.username);
    console.log(user);
    console.log(jwt);
    await this.authService.updateRtHash(user.user_id, jwt.refresh_token);
    res.setHeader('Authorization', 'Bearer ' + jwt.access_token);
    res.cookie('refresh_token', jwt.refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
    });

    return res.json({ access_token: jwt.access_token });
    return res.send({
      success: true,
    });
  }

  @Post('/login')
  async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any> {
    const user = await this.authService.validateUser(userDTO);
    const jwt = await this.authService.getTokens(user.user_id, user.username);
    await this.authService.updateRtHash(user.user_id, jwt.refresh_token);
    res.setHeader('Authorization', 'Bearer ' + jwt.access_token);
    res.cookie('refresh_token', jwt.refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
    });

    return res.json({ access_token: jwt.access_token });
    // return res.send({
    //     success : true
    // })
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard)
  async isAuthtenticated(@Req() req: Request): Promise<any> {
    const user: any = req.user;
    const { password, hashedRt, ...result } =
      await this.authService.getInfoById(user.user_id);

    return result;
  }

  @Get('/refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Req() req: any, @Res() res: Response) {
    const accessToken = this.authService.getJwtAccessToken(req.user.user_id);

    return res.send({ access_token: accessToken });
  }

  @Get('/cookies')
  getCookies(@Req() req: Request, @Res() res: Response): any {
    const jwt = req.cookies['jwt'];
    return res.send(jwt);
  }

  //   @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Req() req, @Res() res: Response): Promise<any> {
    // await this.UserService.removeRefreshToken(req.user.id)
    res.cookie('refresh_token', '', {
      maxAge: 0,
    });

    // await this.authService.removeRefreshToken(req.user.user_id);

    return res.send({
      success: true,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('/nickname')
  async changeNickname(
    @Body() body,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.userService.updateNickname(
      req.user.user_id,
      body,
    );
    if (result.affected === 1) {
      return res.send({
        success: true,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Patch('/password')
  async changePassword(
    @Body() body,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.verifyPassword(
      req.user.user_id,
      body,
    );
    console.log(result);
    if (result.affected === 1) {
      return res.send({
        success: true,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteuser(@Req() req, @Res() res: Response): Promise<any> {
    const result = await this.authService.deleteUser(req.user.user_id);
    if (result.affected === 1) {
      return res.send({
        success: true,
      });
    }
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDTO): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.authService.verifyEmail(signupVerifyToken);
  }

  @Post('/reset-password')
  async resetPassword(@Query() dto: UserDTO): Promise<string> {
    return await this.authService.resetPassword(dto);
  }

  // // 사용자 프로필 가져오기
  // @Get('/:username')
  // getContentById(@Param ('username') username: string): Promise<any> {
  //     return this.authService.getInfoById(username);
  // }
}
