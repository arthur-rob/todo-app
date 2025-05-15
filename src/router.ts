import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('./views/Login.vue'),
    },
    {
        path: '/create-account',
        name: 'create-account',
        component: () => import('./views/CreateAccount.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./views/Dashboard.vue'),
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth && !token) {
        next('/')
    } else {
        next()
    }
})

export { router }
