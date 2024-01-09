import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

   constructor(private authService: AuthService){}

    @Post('login')
    async signIn(@Body() body: any) {
        const {email, password} = body
        return this.authService.signIn({email, password})
    }


    @Post('signup')
    async signUp(@Body() body: any): Promise<any> {
        const {email, password} = body
        const result = await this.authService.signUp({email, password})
       console.log(result)
        return result
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
       return req.user
    }
}
