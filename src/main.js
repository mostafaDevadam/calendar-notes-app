import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import store from './stores/vuex/store.index'
import { BootstrapVue } from 'bootstrap-vue'
import { createVuetify,  } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'
import V from 'vuetify/lib/framework'
import moment from 'vue-moment'

import { VCalendar,VCalendarDay,VCalendarHeader,VCalendarInterval,
    VCalendarIntervalEvent,VCalendarMonthDay, } from 'vuetify/labs/VCalendar'
//import VueMaterial from 'vue-material'


//import 'vue-material/dist/vue-material.min.css'
//import 'vue-material/dist/theme/default.css'
// Import Bootstrap and BootstrapVue CSS files (order is important)
//import '../node_modules/bootstrap/dist/css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

//import '../node_modules/bootstrap-vue/dist/bootstrap-vue-icons.css'

//import './plugins/bootstrap-vue'

const components_ = {...components,
    VCalendar,VCalendarDay,
    VCalendarHeader,VCalendarInterval,
    VCalendarIntervalEvent,VCalendarMonthDay,

}
const option = {
     /*date: {
        //adapter: VuetifyDateAdapter,
      },*/
    /*icons: {

    },*/
    theme: {
        defaultTheme: 'dark',
    }
}
const vuetify = new createVuetify({
    components: components_,
    labsComponents,
    directives,

})


const pinia = createPinia()
const app = createApp(App)
// Make BootstrapVue available throughout your project
// Optionally install the BootstrapVue icon components plugin
//app.use(IconsPlugin)

app.use(pinia)
app.use(store)
app.use(router)
app.use(vuetify)

app.mount('#app')

//createApp(App).use(createPinia()).use(router).mount('#app')
