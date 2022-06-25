import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe, Param, Delete, Patch } from '@nestjs/common';
import { Request,Response} from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';
import { JwtRefreshGuard } from './security/jwt-refresh.guard';
import { LocalAuthGuard } from './security/local-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class AuthController {
    constructor(private authService: AuthService,
        private userService: UserService){}

    @Post()
    @UsePipes(ValidationPipe)
    async registerAccount(@Req() req: Request, @Body() UserDTO: UserDTO): Promise<any> {
        const data = await this.authService.registerUser(UserDTO)
        return {success: true, data};
    }
    

    @Post('/login')
    async login(@Body() userDTO: UserDTO, @Res() res:Response ): Promise<any> {
        const jwt=await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', 'Bearer '+jwt.access_token)
        res.cookie('refresh_token', jwt.refresh_token,{
            httpOnly: true,
            maxAge: 7*24* 60 * 60 * 1000 // 7day
    })


        return res.json({"access_token": jwt.access_token});
        // return res.send({
        //     success : true
        // })

    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthtenticated(@Req() req: Request): any {
        const user: any= req.user;
        return user;
    }


    @Get('/refresh/:id')
    @UseGuards(JwtRefreshGuard)
    refresh(@Param('id') user_id, @Res() res: Response) {
        const accessToken = this.authService.getJwtAccessToken(user_id);
        
        return res.send({"accessToken" : accessToken});
      }


    @Get('/cookies')
    getCookies(@Req() req:Request, @Res() res:Response): any{
        const jwt= req.cookies['jwt'];
        return res.send(jwt);
    }

    @UseGuards(AuthGuard)
    @Post('/logout/:id')
    async logout(@Param('id') user_id: number, @Req() req , @Res() res: Response): Promise<any>{
        
        // await this.UserService.removeRefreshToken(req.user.id)
        res.cookie('refresh_token', '', {
            maxAge: 0
        });

        await this.authService.removeRefreshToken(user_id);

        return res.send({
            success : true
        })
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    async changeNickname(@Param('id') user_id: number, @Req() req, @Res() res: Response): Promise<any>{
        
        //const result = await this.userService.updateNickname(user_id,nickname);
    }

    @UseGuards(AuthGuard)
    @Patch('/password/:id')
    async changePassword(@Param('id') user_id: number, @Req() req, @Res() res: Response): Promise<any>{
        // const result = await this.userService.updateNickname(user_id);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async deleteuser(@Param ('id') user_id: number, @Res() res: Response): Promise<any>{
        const result = await this.authService.deleteUser (user_id);
        if(result.affected===1){
            return res.send({
                success: true
            })
        }

    }
    // 사용자 프로필 가져오기
    @Get('/:username')
    getContentById(@Param ('username') username: string): Promise<any> {
        return this.authService.getInfoById(username);
    }

}
