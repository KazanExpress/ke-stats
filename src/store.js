import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    access_token: '',
    basic_token: '',
    loading: false,
    headerVisible: true,
    asideVisible: true
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
    clearCredentials () {
      this.commit('username', undefined);
      this.commit('access_token', undefined);
    },
    saveCredentials (state, creds) {
      console.log(creds.username, creds.access_token);
      this.commit('username', creds.username);
      this.commit('access_token', creds.access_token);
    },
    loading (state, value) {
      state.loading = value;
    },
    hideHeader (state) {
      state.headerVisible = false;
    },
    hideAside (state) {
      state.asideVisible = false;
    },
    showHeader (state) {
      state.headerVisible = true;
    },
    showAside (state) {
      state.asideVisible = true;
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
    },
    access_token: state => {
      if (!state.access_token) {
        let access_token = localStorage.getItem('access_token');
        if (access_token) {
          state.access_token = access_token;
        }
      }
      return state.access_token;
    }
  },
  actions: {
  }
})
