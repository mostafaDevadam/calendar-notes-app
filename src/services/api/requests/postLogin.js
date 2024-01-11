import { callAPI } from "../callAPI"


export const postLogin = async (data) => {
  const result = await callAPI("POST", "auth/login", data)
  return result.data
}
