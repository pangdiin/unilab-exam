import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    auth_success(state, payload) {
      state.isLoggedIn = payload;
    },
    logout(state, payload) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    login({ commit }) {
      return new Promise((resolve) => {
        commit("auth_success", true);
        localStorage.setItem("token", "JWT");
        resolve();
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout", false);
        localStorage.removeItem("token");
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.isLoggedIn;
    },
  },
  modules: {},
});
