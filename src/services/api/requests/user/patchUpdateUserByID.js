import { callAPI } from "../../callAPI"


export const patchUpdateUserByID = async (userID, data) => {
    const result = await callAPI("PATCH", "user/update/"+userID, data)
    return result.data
}
