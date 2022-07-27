import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Toast } from 'vant'

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
        path: '/company',
        name: '',
        component: () => import('@/views/company')
      },
      {
        path: '/question',
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
        path: '/mine',
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
  },
  {
    path: '/question/topic',
    component: () => import('@/views/question/components/topic')
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

// 配置导航守卫
router.beforeEach(async (to, from, next) => {
  // 判断登录的路由是否需要登录
  if (to.meta.needLogin) {
    if (store.state.token) {
      await store.dispatch('getUserInfo')
      next()
    } else {
      Toast.fail('您还没登录,请先登录')
      next('/login')
    }
  } else {
    next()
  }
})

// 解决路由守卫内在错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
