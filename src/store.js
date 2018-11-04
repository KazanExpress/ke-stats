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
      localStorage.setItem('username', value);
      state.username = value;
    },
    access_token (state, value) {
      localStorage.setItem('access_token', value);
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
      console.log("Username: " + state.username);
      console.log(!state.username);
      if (!state.username) {
        let username = localStorage.getItem('username');
        console.log(username);
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
