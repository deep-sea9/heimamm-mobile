import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedstate({ paths: ['token'] })],

  state: {
    token: '',
    userInfo: ''
  },
  getters: {},
  mutations: {
    setUnsetInfo (state, value) {
      state.userInfo = value
    }
  },
  actions: {
    getUserInfo (context, value) {}
  },
  modules: {}
})
