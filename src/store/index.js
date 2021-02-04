import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setInfo(state,value) {
      state.token = value.token
      state.userInfo = value.data
    }
  },
  actions: {
  },
  modules: {
  }
})
