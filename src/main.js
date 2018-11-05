import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getters.access_token) {
    console.log("You need to authorize");
    return next("/login");
  }
  if (to.path === '/login' && !!store.getters.access_token) {
    console.log("You do not need to authorize");
    return next("/");
  }
  if (to.path === '/login') {
    store.commit('hideAside');
    store.commit('hideHeader');
  } else {
    store.commit('showAside');
    store.commit('showHeader');
  }
  return next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
