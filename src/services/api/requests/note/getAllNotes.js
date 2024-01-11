import { callAPI } from "../../callAPI"

export const getAllNotes = async () => {
    const result = await callAPI("GET", "note/all")
    return result.data
}
