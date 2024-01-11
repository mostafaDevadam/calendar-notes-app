import { getAllNotes } from "./getAllNotes"
import { getAllNotesByUserID } from "./getAllNotesByUserID"
import { getNoteById } from "./getNoteById"
import { patchUpdateNoteById } from "./patchUpdateNoteById"
import { postCreateNoteByUserID } from "./postCreateNoteByUserID"
import {removeNoteById} from './removeNoteById'

export const NoteService = {
    getNoteById,
    getAllNotesByUserID,
    getAllNotes,
    patchUpdateNoteById,
    postCreateNoteByUserID,
    removeNoteById,
}
