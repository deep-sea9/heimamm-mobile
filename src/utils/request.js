/**
 * 接口配置
 */
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import router from '@/router'

// 创建axios副本
const _axios = axios.create({
  // baseURL: 'http://localhost:1337'
  // 在线接口
  baseURL: 'http://106.55.138.21:1337'
  // 本地接口
  // baseURL: 'http://192.168.11.131:1337/'
})

// 配置请求拦截器
_axios.interceptors.request.use(
  config => {
    if (config.needToken) {
      config.headers.Authorization = `Bearer ${store.state.token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 配置响应拦截器
_axios.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res
    } else if (res.data.code === 401) {
      Toast.fail(res.data.message)
      return router.push('/login')
    } else {
      Toast.fail(res.data.message)
      return Promise.reject(new Error(res.data.message))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

// 导出axios副本
export default _axios
