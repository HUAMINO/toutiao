import Vue from 'vue'
import Vuex from 'vuex'

// 引入封住好的数据存储的方法
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（taken等信息）
    user: getItem(TOKEN_KEY) || {}
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      //  为了防止刷新数据丢失，我们需要把数据备份到本地存储
      setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
