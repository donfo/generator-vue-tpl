// import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import installStyles from './install-styles'
installStyles()

import installCommonLibs from './install-common-libs'
installCommonLibs(Vue)

import installCommonUtils from './install-common-utils'
installCommonUtils(Vue)

import vueExtend from './vue-extend'
vueExtend(Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: createElement => createElement(App)
})
