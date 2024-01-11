import { callAPI } from "../../callAPI"

export const getAllNotesByUserID = async (userID) => {
    const result = await callAPI("GET", "note/all/user/"+userID)
    return result.data
}
