import mongoose, { Document, Types } from "mongoose";


export interface INote extends Document {
    readonly title: string;
    readonly body: string;
}

export const NoteSchema = new mongoose.Schema({
    title: { type: String, },
    body: { type: String, },
    start: { type: String, },
    end: { type: String, },
    allDay: { type: String, },

    user: { type: Types.ObjectId, ref: 'User' }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
} )
