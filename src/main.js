import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import store from './stores/vuex/store.index'
import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
//import '../node_modules/bootstrap/dist/css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

//import '../node_modules/bootstrap-vue/dist/bootstrap-vue-icons.css'

//import './plugins/bootstrap-vue'


const pinia = createPinia()
const app = createApp(App)
// Make BootstrapVue available throughout your project
// Optionally install the BootstrapVue icon components plugin
//app.use(IconsPlugin)

app.use(pinia)
app.use(store)
app.use(router)


app.mount('#app')

//createApp(App).use(createPinia()).use(router).mount('#app')
