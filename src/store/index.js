import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
