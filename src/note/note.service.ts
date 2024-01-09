import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INote } from './note.model';

@Injectable()
export class NoteService {
    constructor(
    @InjectModel('Note')
    private readonly noteModel: Model<INote>
    ) {}

    async create(data: any): Promise<any> {
        const created = new this.noteModel(data)
        return await created.save()
    }

    async findAll(): Promise<any[]> {
        return await this.noteModel.find()
    }

    async findAllByUserID(userID: any): Promise<any[]> {
        return await this.noteModel.find({user: userID})
    }

    async findOneById(_id: any): Promise<any> {
        return await this.noteModel.findById(_id)
    }


    async update(_id: any, data: any): Promise<any> {
        return  await this.noteModel.findByIdAndUpdate(_id, data, {new: true})
    }

    async remove(_id: any): Promise<any>{
          return await this.noteModel.findByIdAndDelete(_id)
    }

}
