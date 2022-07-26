/**
 * 接口配置
 */
import axios from 'axios'

// 创建axios副本
const _axios = axios.create({
<<<<<<< HEAD
  // baseURL: 'http://localhost:1337'
  // baseURL: 'http://106.55.138.21:1337'
  baseURL: 'http://192.168.11.131:1337/'
=======
  baseURL: 'http://106.55.138.21:1337'
>>>>>>> 44e0db4ec81cf3941d7503d99fb9217ce46823d6
})

// 配置请求拦截器
_axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 配置响应拦截器
_axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

// 导出axios副本
export default _axios
