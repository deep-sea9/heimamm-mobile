import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [persistedstate({ paths: ['token'] })]
})
