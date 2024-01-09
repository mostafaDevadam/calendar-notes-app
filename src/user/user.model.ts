import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { now } from "mongoose"
/*
export const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},

},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

export const UserModel = mongoose.model("User", UserSchema)
*/

@Schema({ timestamps: true})
export class User {
    @Prop({ required: true})
    email: string;

    @Prop({ required: true})
    password: string;

    @Prop()
    avatar: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)
