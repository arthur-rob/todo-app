import App from './App.vue'
import './style.css'
import 'vuetify/styles'
import { router } from './router'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/auth'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
})
app.use(pinia)

const authStore = useAuthStore()
authStore.initialize()

app.use(router).use(vuetify).mount('#app')
