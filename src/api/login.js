/**
 * 登录API
 */
import request from '@/utils/request'

// 获取验证码
export const code = (data) => {
  return request({
    url: '/au/code',
    method: 'post',
    data
  })
}
// 登录
export const login = (data) => {
  return request({
    url: '/au/login',
    method: 'post',
    data
  })
}
