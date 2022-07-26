import request from '@/utils/request'
// 获取面试技巧列表
export const articlesTechnic = () => {
  return request({
    url: '/articles/technic'
  })
}
// 获取市场数据列表
export const chartDataHot = () => {
  return request({
    url: '/chart-data/hot'
  })
}
// 获取面经分享列表
export const articlesShare = () => {
  return request({
    url: '/articles/share'
  })
}
