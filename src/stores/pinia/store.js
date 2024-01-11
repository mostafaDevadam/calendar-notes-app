import { NoteService } from "@/services/api/requests/note/note.service";
import { UserService } from "@/services/api/requests/user/user.service";
import { AuthService } from "@/services/auth.service";
import { defineStore } from "pinia";


export const useStore = defineStore('Task', {

    state: () => ({
        isAuth: false,
        user: null,
        notes: [],
        note: null,
        userDoc: null,
        notesByUser: [],


    }),
    getters: {
        getAuth(state) {
            console.log("getAuth state:", state)
            return state.isAuth
        },
        getNoteById(state) {
            return state.note
        },
        getAllNotes(state) {
            return state.notes
        },
        getAllNotesByUserID(state) {
            return state.notesByUser
        },
        getUserByID(state) {
            console.log("get userbyID: ", state.userDoc)
            return state.userDoc
        },
        getEditNote(state) {
            return state.note
        }
    },
    actions: {
        async setAuth(val) {
            this.isAuth = val
            console.log("isAuth ", this.isAuth)
        },
        async setUser(user) {
            this.user = user
            console.log("isAuth ", this.user)
        },
        async setAuthLogin(email, password) {
            // fetch login response
            const res = await AuthService.login(email, password)
            if (res) {
                console.log("setAuthLogin res: ", res)
                this.isAuth = true
                this.user = res.payload
                //this.$router.push("/")
            }
        },
        async signup(email, password) {
            const res = await AuthService.signup(email, password)
            if (res) {
                console.log("res signup:", res)
            }
        },
        async updateUserByID(userID, data) {
            return
        },
        logout() {
            AuthService.logout()
            this.isAuth = false
        },
        async fetchUserByID(userID) {
            const result = await UserService.getUserByID(userID)
            console.log("fetch user:", result)
            // this.userDoc = result
        },
        setUserDoc(data) {
            this.userDoc = data
        },
        async createNote(userID, note) {
            const doc = await NoteService.postCreateNoteByUserID(userID, note)
            console.log('doc new note:', doc)

        },
        async setFetchAllNotes() {
            const docs = await NoteService.getAllNotes()
            console.log('docs all notes:', docs)
            this.notes = docs
        },
        async setFetchAllNotesByUserID(userID) {
            const docs = await NoteService.getAllNotesByUserID(userID)
            console.log('docs all notes by userid:', docs)
            this.notesByUser = docs

        },
        async setFetchNoteById(noteId) {
            const doc = await NoteService.getNoteById(noteId)
            console.log('doc fetch note:', doc)
            this.note = doc

        },
        async setNote(note) {
            this.note = note
        },
        async updateNote(_id, note) {
            const doc = await NoteService.patchUpdateNoteById(_id, note)
            this.note = doc
            console.log('doc updated note:', doc)
        },
        async removeNote(_id) {
            const doc = await NoteService.removeNoteById(_id)
            this.note = "remove"
            console.log('doc removed note:', doc)
        },

    }
})
