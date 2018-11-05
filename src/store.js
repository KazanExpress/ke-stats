import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    access_token: '',
    basic_token: '',
    loading: false
  },
  mutations: {
    username (state, value) {
      if (!value) {
        localStorage.removeItem('username')
      } else {
        localStorage.setItem('username', value);
      }
      state.username = value;
    },
    access_token (state, value) {
      if (!value) {
        localStorage.removeItem('access_token')
      } else {
        localStorage.setItem('access_token', value);
      }
      state.access_token = value;
    },
    loading (state, value) {
      state.loading = value;
    }
  },
  getters: {
    loading: state => {
      return state.loading;
    },
    username: state => {
      if (!state.username) {
        let username = localStorage.getItem('username');
        if (username) {
          state.username = username;
        }
      }
      return state.username;
    }
  },
  actions: {

  }
})
