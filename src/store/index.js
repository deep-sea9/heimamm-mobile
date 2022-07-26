import Vue from 'vue'
import Vuex from 'vuex'

import persistedstate from 'vuex-persistedstate'

import { auInfo } from '@/api/mine'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedstate({ paths: ['token'] })],

  state: {
    token: '',
    userInfo: ''
  },
  getters: {},
  mutations: {
    setUserInfo (state, value) {
      state.userInfo = value
    },
    setToken (state, value) {
      state.token = value
    }
  },
  actions: {
    async getUserInfo (context) {
      // 如果没有用户Id就发请求获取用户信息
      if (!context.state.userInfo.id) {
        const res = await auInfo()
        context.commit('setUserInfo', res.data.data)
      }
    }
  },
  modules: {}
})
