import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getters.username) {
    console.log("Redirect to login");
    alert("You need to authorize");
    return next("/login");
  }
  return next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
