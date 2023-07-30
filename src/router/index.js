import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/view/login/index.vue')
    },
    {
        path: '/init',
        name: 'Init',
        component: () => import('@/view/init/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router