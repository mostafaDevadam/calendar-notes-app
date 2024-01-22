import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';

@Injectable()
export class UserService {

    private users: any[] = [{
        email: "test1@gmx.de",
        password: "123123"
    },{
        email: "test2@gmx.de",
        password: "456456"
    }]

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}


    async getOneByID(_id) {
        return await this.userModel.findById(_id, { password: 0 })
    }


    async findOneByEmail(email: string) {
        //return await this.userModel.findOne({ email: email })
        //return this.users.find(f => f.email === email)
        return await this.userModel.findOne({email: email})
    }

    async createUser(data: any): Promise<any> {
        const new_user = new this.userModel(data)
        const usr = await new_user.save()
        console.log(usr)
        return usr
    }

    async update(_id: any, data: any) {
        return await this.userModel.findByIdAndUpdate(_id, data, {new: true})
    }
}
