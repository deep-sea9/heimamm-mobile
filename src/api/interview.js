/**
 * 面试相关API
 */
import request from '@/utils/request'

//  模拟面试筛选条件
export const interviewFilters = () => {
  return request({
    url: '/interview/filters'
  })
}
