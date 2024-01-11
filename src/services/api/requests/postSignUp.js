import { callAPI } from "../callAPI"

export const postSignUp = async (data) => {
    const result = await callAPI("POST", "auth/signup", data)
    return result.data
}
