import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/chart1',
      meta: {
        title: 'Home',
        authRequired: true
      }
    },
    {
      path: '/chart2',
      name: 'chart2',
      meta: {
        title: 'Sells List',
        authRequired: true
      },
      component: () => import('./views/Chart2.vue')
    },
    {
      path: '/chart1',
      name: 'chart1',
      meta: {
        title: 'Sells Chart',
        authRequired: true
      },
      component: () => import('./views/Chart1.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Chart One',
        authRequired: false,
        hideNav: true
      },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/error',
      alias: '*',
      name: 'error',
      component: () => import('./views/Error.vue'),
      props: true,
      meta: {
        title: 'Error',
        authRequired: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired && !store.getters.access_token) {
    console.log("You need to authorize");
    return next("/login");
  }
  if (to.path === '/login' && !!store.getters.access_token) {
    console.log("You do not need to authorize");
    return next("/");
  }
  if (to.meta.hideNav) {
    store.commit('hideAside');
    store.commit('hideHeader');
  } else {
    store.commit('showAside');
    store.commit('showHeader');
  }
  return next();
});

export default router;