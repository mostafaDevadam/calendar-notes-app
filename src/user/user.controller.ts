import { Controller, Post, Body, UseGuards, Param, Patch, Get, } from '@nestjs/common';
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

    @Get('/:_id')
    async getUser(@Param("_id") _id: any) {
        const user = await this.service.getOneByID(_id)
        return user
    }

    @Patch('/:_id')
    async updateUser(@Param("_id") _id: any, @Body() body: any) {
        const user = await this.service.update(_id, body)
        return user
    }
}
