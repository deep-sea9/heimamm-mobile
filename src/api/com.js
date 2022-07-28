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
    url: '/companies/' + id,
    noToken: true
  })
}
// 获取公司评论数据
export const companiesComments = params => {
  return request({
    url: `/companies/${params.id}comments`,
    params,
    noToken: true
  })
}
// 获取公司职位
export const companiesPositions = id => {
  return request({
    url: `/companies/${id}/positions`,
    noToken: true
  })
}
// 获取公司职位筛选
export const companiesPositionFilters = id => {
  return request({
    url: `/companies/${id}/positionFilters`,
    noToken: true
  })
}
