import request from '@/utils/request'
// 获取面试技巧列表
export const articlesTechnic = params => {
  return request({
    url: '/articles/technic',
    params
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
// 获取面经评论
export const articlesCommentsId = params => {
  return request({
    url: '/articles/comments/' + params.id,
    params
  })
}
// 发布评论
export const articlesComments = data => {
  return request({
    url: '/articles/comments',
    method: 'post',
    data,
    needToken: true
  })
}

// 获取城市索引
export const chartDataIndexes = () => {
  return request({
    url: '/chart-data/indexes'
  })
}

// 获取统计信息
export const chartDataStatistics = params => {
  return request({
    url: '/chart-data/statistics',
    params
  })
}
