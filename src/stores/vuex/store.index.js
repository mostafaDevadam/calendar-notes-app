import { createStore } from "vuex";
import authStore from './auth.store'
import {noteStore} from './note.store'

export default createStore({
    modules: {
        authStore,
        noteStore
    }
})
