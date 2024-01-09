import { Controller, Post, Body, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private service: UserService){}
 
    @Post()
    async create(@Body() body: any) {
        const {email, password} = body
        const user = await this.service.createUser({email, password})
        return user
    }

    @Post('email')
    async getByEmail(@Body() body: any) {
        const {email} = body
        const user = await this.service.findOneByEmail(email)
        return user
    }
}
