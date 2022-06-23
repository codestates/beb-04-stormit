import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe, Param, Delete } from '@nestjs/common';
import { Request,Response} from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';

@Controller('user')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    @UsePipes(ValidationPipe)
    async registerAccount(@Req() req: Request, @Body() UserDTO: UserDTO): Promise<any> {
        const data = await this.authService.registerUser(UserDTO)
        return {success: true, data};
    }

    @Post('/login')
    async login(@Body() userDTO: UserDTO, @Res() res:Response ): Promise<any> {
        const jwt=await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', 'Bearer '+jwt.accessToken)
        res.cookie('jwt', jwt.accessToken,{
            httpOnly: true,
            maxAge: 24* 60 * 60 * 1000 // 1day
        })
        return res.json(jwt);

    }


    
    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthtenticated(@Req() req: Request): any {
        const user: any= req.user;
        return user;
    }


    // 사용자 프로필 가져오기
    @Get('/:username')
    getContentById(@Param ('username') username: string): Promise<any> {
        return this.authService.getInfoById(username);
    }


    @Get('/cookies')
    getCookies(@Req() req:Request, @Res() res:Response): any{
        const jwt= req.cookies['jwt'];
        return res.send(jwt);
    }

    @Post('/logout')
    logout(@Res() res: Response): any{
        res.cookie('jwt', '', {
            maxAge: 0
        });
        return res.send({
            message : 'success'
        })
    }
    @Delete('/:id')
    deleteuser(@Param ('id') user_id: number): Promise<any> {
        return this.authService.deleteUser (user_id);
    }
}
