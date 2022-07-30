import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/utils/vant'
import '@/style/index.less'
import filter from '@/filters'
import echarts from 'echarts' // 引入echarts
Vue.prototype.$echarts = echarts // 将echarts挂载到Vue原型上
Vue.use(filter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
