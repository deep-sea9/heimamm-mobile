import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/utils/vant'
import '@/style/index.less'
import '@/assets/iconfont/iconfont.css'
import filter from '@/filters'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts // 挂载到Vue实例上面

Vue.use(filter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
