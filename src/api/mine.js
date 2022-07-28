import request from '@/utils/request'

// 获取用户信息
export const auInfo = () => {
  return request({
    url: '/au/info',
    needToken: true
  })
}

// 修改用户信息
export const auEdit = data => {
  return request({
    url: '/au/edit',
    method: 'post',
    needToken: true,
    data
  })
}
// 获取图片上传的id
export const Upload = data => {
  return request({
    url: '/upload',
    needToken: true,
    method: 'post',
    data
  })
}
