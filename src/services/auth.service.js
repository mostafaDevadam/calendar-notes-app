import { postLogin } from "./api/requests/postLogin"
import { postSignUp } from "./api/requests/postSignUp"
import { StorageService } from "./storage"

let isAuthenticated = true

 const set =(val) => { isAuthenticated = value}

 const get = () => isAuthenticated


 const signup = async (email, password) => {
   const res = await postSignUp({email, password})
   return res
 }

 const login = async (email, password) => {
   const res = await postLogin({email, password})
   console.log("login res: ", res)
   StorageService.saveItem("TOKEN", res.payload.access_token)
   StorageService.saveItem("USER", res.payload)
   return res
 }

 const logout = () => {
    StorageService.removeItem("TOKEN")
    StorageService.removeItem("USER")
 }

 const getToken = async () => {
  return await StorageService.getItem("TOKEN")
 }

 export const AuthService = { set, get, login, logout, getToken, signup}
