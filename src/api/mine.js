import request from '@/utils/request'
import store from '@/store/index'

// 获取用户信息
export const auInfo = () => {
  return request({
    url: '/au/info',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
