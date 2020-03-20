import Vue from 'vue'
import Vuex from 'vuex'

const initState = {
  token: (localStorage.getItem("token")) || null
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...initState
  },
  getters: {
    isLoggedIn({ token }) {
      return token !== null;
    }
  },
  mutations: {
  },
  actions: {
  }
})
