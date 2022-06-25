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
    async isAuthtenticated(@Req() req: Request): Promise<any> {
        const user: any= req.user;
        const {password, hashedRt, ...result} = await this.authService.getInfoById(user.user_id)
        
        return result;
    }


    @Get('/refresh')
    @UseGuards(JwtRefreshGuard)
    refresh(@Req() req: any, @Res() res: Response) {

        const accessToken = this.authService.getJwtAccessToken(req.user.user_id);
        
        return res.send({"access_token" : accessToken});
      }


    @Get('/cookies')
    getCookies(@Req() req:Request, @Res() res:Response): any{
        const jwt= req.cookies['jwt'];
        return res.send(jwt);
    }

    @UseGuards(AuthGuard)
    @Post('/logout')
    async logout(@Req() req , @Res() res: Response): Promise<any>{
        console.log(req.user.user_id)
        // await this.UserService.removeRefreshToken(req.user.id)
        res.cookie('refresh_token', '', {
            maxAge: 0
        });

        await this.authService.removeRefreshToken(req.user.user_id);

        return res.send({
            success : true
        })
    }

    @UseGuards(AuthGuard)
    @Patch('/nickname')
    async changeNickname(@Body() body, @Req() req, @Res() res: Response): Promise<any>{
        console.log(body.nickname)
        const result = await this.userService.updateNickname(req.user.user_id,body);
        if(result.affected===1){
            return res.send({
                success: true
            })
        }
    }

    @UseGuards(AuthGuard)
    @Patch('/password')
    async changePassword(@Body() body, @Req() req, @Res() res: Response): Promise<any>{
        const result = await this.authService.verifyPassword(req.user.user_id,body);
        if(result.affected===1){
            return res.send({
                success: true
            })
        }
    }

    @UseGuards(AuthGuard)
    @Delete()
    async deleteuser(@Req() req, @Res() res: Response): Promise<any>{
        const result = await this.authService.deleteUser (req.user.user_id);
        if(result.affected===1){
            return res.send({
                success: true
            })
        }

    }
    // // 사용자 프로필 가져오기
    // @Get('/:username')
    // getContentById(@Param ('username') username: string): Promise<any> {
    //     return this.authService.getInfoById(username);
    // }

}
