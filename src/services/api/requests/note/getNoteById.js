import { callAPI } from "../../callAPI"

export const getNoteById = async (_id) => {
    const result = await callAPI("GET", "note/"+_id)
    return result.data
}
