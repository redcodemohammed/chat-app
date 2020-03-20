import Vue from 'vue'
import Vuex from 'vuex'

const initState = {
  token: (localStorage.getItem("token")) || null
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...initState,
    user: {}
  },
  getters: {
    isLoggedIn({ token }) {
      return token !== null;
    },
    token({ token }) {
      return token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.token = null;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    setToken({ commit }, token) {
      localStorage.setItem("token", token)
      commit("setToken", token);
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("logout");
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    }
  }
})
