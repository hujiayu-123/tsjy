import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import api from '../api/index'
import { Message } from 'element-ui';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {},
    typeList: [],
    shopList: []
  },
  mutations: {
    setInfo(state,value) {
      state.token = value.token
      state.userInfo = value.data
    },
    setType(state,value) {
      state.typeList = value
    },
    setShopList(state,value) {
      state.shopList = value
    },
    getLogin(state,value) {
      Message.success({
        message: '登录超时，请重新登录',
      })
      router.push({path: '/login'})
    }
  },
  actions: {
    getShopList:(_this) => {
      api.shoplist().then((res) => {
        if(res.code === 200) {
          _this.commit('setShopList',res.data)
        }
      })
    },
    handleShopDel:(_this,value) => {
      let params = {
        sid: value.sid
      };
      api.del(params).then(res => {
        if (res.code === 200) {
          _this.dispatch('getShopList')
        }
      });
    },
  },
  modules: {

  }
})
