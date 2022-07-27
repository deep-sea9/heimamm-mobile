import request from '@/utils/request'
// 获取面试技巧列表
export const articlesTechnic = () => {
  return request({
    url: '/articles/technic'
  })
}
// 获取面试技巧详情
export const articlesTechnicId = id => {
  return request({
    url: '/articles/technic/' + id
  })
}
// 获取市场数据列表
export const chartDataHot = () => {
  return request({
    url: '/chart-data/hot'
  })
}
// 获取面经分享列表
export const articlesShare = params => {
  return request({
    url: '/articles/share',
    params
  })
}
// 获取面经热搜
export const articlesShareTopSearch = () => {
  return request({
    url: '/articles/shareTopSearch'
  })
}
// 获取面经详情
export const articlesShareId = id => {
  return request({
    url: '/articles/share/' + id
  })
}
