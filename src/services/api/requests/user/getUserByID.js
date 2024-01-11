import { callAPI } from "../../callAPI"

export const getUserByID = async (_id) => {
    const result = await callAPI("GET", "user/"+ _id)
    return result.data
}
