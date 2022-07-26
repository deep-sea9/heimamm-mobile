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
        path: '/find',
        name: '',
        component: () => import('@/views/find')
      },
      // 面经分享热搜
      {
        path: '/shareList',
        component: () => import('@/views/find/components/shareList'),
        meta: {
          noTab: true
        }
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
        path: '/mine/post',
        name: 'post',
        meta: {
          needLogin: true,
          noTab: true
        },
        component: () => import('@/views/mine/components/post.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

const router = new VueRouter({
  routes
})

export default router
