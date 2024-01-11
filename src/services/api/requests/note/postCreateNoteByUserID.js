import { callAPI } from "../../callAPI"

const METHOD_REQUEST = {
    "POST" :"POST",
}

export const postCreateNoteByUserID = async (userID, data) => {
    console.log("before create note:", userID, data)
    const result = await callAPI("POST", "note/"+userID, data)
    return result.data
}
