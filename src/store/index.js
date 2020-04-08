import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null
  },
  mutations: {
    setUser(state,user){
      state.user = user
    }
  },
  getters:{
    getUserName: state=>{
      return state.user.username
    }
  },
  actions: {
  },
  modules: {
  }
})
