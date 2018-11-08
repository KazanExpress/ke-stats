import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home',
        authRequired: true
      },
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
    }
  ]
})
