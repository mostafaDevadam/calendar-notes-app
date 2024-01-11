import axios from "axios"
import { AuthService } from "../auth.service"

const base_url = "http://localhost:5001/api/v0/"

const buildHeader = async () => {
    return {
        ...( await AuthService.getToken() && {"auth-token": await AuthService.getToken()})
    }
}
export const callAPI = async (method, url, data) => {
    return await axios({
        baseURL: base_url + url,
        method: method,
        data: data && data,
       //...( await buildHeader() && {headers: await buildHeader()})
       headers: await buildHeader(),
    })
}
