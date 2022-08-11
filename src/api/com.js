import request from '@/utils/request'
// 获取到公司列表
export const companiesList = params => {
  return request({
    url: '/companies/list',
    params
  })
}
// 获取到公司详情
export const companies = id => {
  return request({
    url: '/companies/' + id
  })
}
// 获取公司评论数据
export const companiesComments = params => {
  return request({
    url: `/companies/${params.id}/comments`,
    params
  })
}
// 获取公司职位
export const companiesPositions = params => {
  return request({
    url: `/companies/${params.id}/positions`,
    params
  })
}
// 获取公司职位筛选
export const companiesPositionFilters = id => {
  return request({
    url: `/companies/${id}/positionFilters`
  })
}
// 职位详情
export const positionsDetail = id => {
  return request({
    url: '/positions/' + id
  })
}
