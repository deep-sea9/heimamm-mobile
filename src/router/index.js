import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        redirect: '/company'
      },
      {
        path: 'company',
        name: '',
        component: () => import('@/views/company')
      },
      {
        path: 'question',
        name: '',
        component: () => import('@/views/question')
      },
      {
        path: 'find',
        name: '',
        component: () => import('@/views/find')
      },
      {
        path: 'mine',
        name: '',
        meta: {
          needLogin: true
        },
        component: () => import('@/views/mine')
      },
      // 修改用户信息路由
      {
        path: '/info',
        name: 'info',
        meta: {
          needLogin: true,
          noTab: true
        },
        component: () => import('@/views/mine/info.vue')
      },
      {
        path: '/mine/post/:editInfo',
        name: 'post',
        meta: {
          needLogin: true,
          noTab: true
        },
        component: () => import('@/views/mine/components/post.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
