import request from '@/utils/request'

// 获取用户信息
export const auInfo = () => {
  return request({
    url: '/au/info',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4ODE3NTkwLCJleHAiOjE2NjE0MDk1OTB9.5Mgz6QReBKSvzWYrZR_U907zFi2uWZrtaswRcIvmZMU'
    }
  })
}
