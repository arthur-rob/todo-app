import { createWebHistory, createRouter } from 'vue-router'

import CreateAccount from './views/CreateAccount.vue'
import Login from './views/Login.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/create-account', component: CreateAccount },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
