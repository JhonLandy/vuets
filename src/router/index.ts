import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)
  const routes:  Array<RouteConfig> = [
    {
        name: 'home',
        path: '/',
        component: () => import('@/components/home.vue'),
        meta: {
            login: false
        },
        children: [
            {
                name: 'login',
                path: '/login',
                component: () => import('@/views/login/login.vue'),
                meta: {
                    login: false
                }
            },
            {
                name: 'page',
                path: '/page',
                component: () => import('@/views/page/page.vue'),
                meta: {
                    login: false
                }
            },
            {
                name: 'table',
                path: '/table',
                component: () => import('@/views/table/demo.vue'),
                meta: {
                    login: true
                }
            },
            {
                name: 'form',
                path: '/form/index',
                component: () => import('@/views/form/index.vue')
            }
        ]
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
