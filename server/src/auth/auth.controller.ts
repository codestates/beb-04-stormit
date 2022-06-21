import { Body, Controller, Post } from '@nestjs/common';
import { pseudoRandomBytes } from 'crypto';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor ( private authService: AuthService){}
        
    @Post('/signup')
    signUp(@Body() userDTO: UserDTO): Promise<void> {
        return this.authService.signUp(userDTO);
    }

}
