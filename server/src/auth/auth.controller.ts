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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async registerAccount(
    @Req() req: Request,
    @Body() UserDTO: UserDTO,
  ): Promise<any> {
    return await this.authService.registerUser(UserDTO);
  }

  @Post('/login')
  async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.validateUser(userDTO);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1day
    });
    return res.json(jwt);
    // return res.send ({
    //     message : 'success'
    // })
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard)
  isAuthtenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/cookies')
  getCookies(@Req() req: Request, @Res() res: Response): any {
    const jwt = req.cookies['jwt'];
    return res.send(jwt);
  }

  @Post('./logout')
  logout(@Res() res: Response): any {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'success',
    });
  }
}
