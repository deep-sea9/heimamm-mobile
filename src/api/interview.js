/**
 * 面试相关API
 */
import request from '@/utils/request'
import store from '@/store'

//  模拟面试筛选条件
export const interviewFilters = () => {
  return request({
    url: '/interview/filters'
  })
}

// 获取模拟面试题
export const interviewQuestions = params => {
  return request({
    url: '/interview/questions',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    },
    params
  })
}

// 提交试题
export const questionsSubmit = data => {
  return request({
    url: '/questions/submit',
    method: 'post',
    needToken: true,
    data
  })
}

// 面试题详情
export const questionsById = id => {
  return request({
    url: `/questions/${id}`,
    needToken: true
  })
}
