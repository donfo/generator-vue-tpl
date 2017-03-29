// import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import FastClick from 'libs/fastclick'
FastClick.attach(document.body)

import vueExtend from './vue-extend'
vueExtend(Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
