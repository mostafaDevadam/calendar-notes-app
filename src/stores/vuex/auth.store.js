import { createStore } from "vuex";


export default createStore({

    state: {
        user: false,
        token: false,
        isAuth: false,
    },
    getters: {
       /*mein_user: (state) => {
            return state.user
        },
        
        token: (state) => {
            return state.token
        },
        getAuth: (state) => {
            return state.isAuth
        }*/

    },
    actions: {
        user(context, user) {
            context.commit('user', user)
        },
        token(context, token) {
            context.commit('token', token)

        }

    },
    mutations: {
        setAuth() {
            return
        },
        setUser () {
            return
        },
        setToken() {
            return
        },
        setLogout() {
            return
        }


    }



})
