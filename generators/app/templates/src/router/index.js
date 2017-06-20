import store from 'store'
import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Index from 'views/Index'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/user',
    name: 'User',
    component: Hello
  }
]

const router = new Router({
  routes,
  // mode: 'history',
  base: '/app/'
})

router.beforeEach(function (to, from, next) {
  store.commit('loading', { show: true })
  next()
})

router.afterEach(function (to) {
  store.commit('loading', { show: false })
})

export default router
