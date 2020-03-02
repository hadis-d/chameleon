import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store.js'

import Login from '../components/auth/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Register from '../components/auth/Register.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        },
    },
    {
        name: 'Register',
        path: '/register',
        component: Register
    }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router