import { callAPI } from "../../callAPI"

export const removeNoteById = async (_id) => {
    const result = await callAPI("DELETE", "note/" + _id)
    return result.data
}
