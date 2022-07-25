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
        component: () => import('@/views/mine')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
