import moment from 'moment'
const obj = {
  formatTime: time => {
    return moment(time).format('YYYY-MM-DD')
  }
}
export default {
  install (Vue) {
    Object.keys(obj).forEach(key => {
      Vue.filter(key, obj[key])
    })
  }
}
