import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NoteService } from './note.service';

//@UseGuards(AuthGuard)
@Controller('note')
export class NoteController {
    constructor(private service: NoteService){}

    @Post('/:user_id')
    async createNote(@Param('user_id') user_id: any,@Body() body_: any): Promise<any> {
        const {title, body} = body_
        const obj = {user: user_id, title, body}
        console.log(obj)
        return await this.service.create({title, body, user: user_id})
    }

    @Get('all')
    async findAll(){
        return await this.service.findAll()
    }

    @Get('all/user/:user_id')
    async findAllByUserID(@Param('user_id') user_id: any) {
        return await this.service.findAllByUserID(user_id)
    }

    // get
     @Get('/:_id')
    async findOneById(@Param('_id') _id: any): Promise<any> {
        return await this.service.findOneById(_id)
    }

    // update
     @Patch('/:_id')
    async update(@Param('_id') _id: any,@Body() body_: any): Promise<any> {
        const {title, body} = body_
        return await this.service.update(_id, {title, body})
    }

    // remove
     @Delete('/:_id')
    async remove(@Param('_id') _id: any): Promise<any> {

        return await this.service.remove(_id)
    }


}
