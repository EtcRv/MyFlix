import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    user: null,
    isUserLoggedIn: false,
    token: null,
  },
  getters: {
    getToken(state) {
      return state.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) state.isUserLoggedIn = true;
      else state.isUserLoggedIn = false;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
  },
  modules: {},
});
