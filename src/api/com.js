// 获取到公司列表
import request from '@/utils/request'
export const companieslist = () => {
  return request({
    url: '/companies/list'
  })
}
