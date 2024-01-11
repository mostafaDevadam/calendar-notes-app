import { callAPI } from "../../callAPI"


export const patchUpdateNoteById = async (_id, data) => {
    const result = await callAPI("PATCH", "note/"+_id, data)
    return result.data
}
