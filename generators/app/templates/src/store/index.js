import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import * as getters from './getters'
import base from './modules/base'
import setting from './modules/setting'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    base,
    setting
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

const storeModules = {
  loading: {
    show: false,
    title: '加载中',
    full: false,
    position: 'fixed'
  },
  toast: {
    show: false,
    type: 'text',
    time: 2000,
    width: '7.6em',
    isShowMask: false,
    title: '',
    onShow: () => {},
    onHide: () => {}
  },
  alert: {
    show: false,
    title: '',
    content: '',
    buttonText: '确定',
    maskTransition: 'vux-fade',
    dialogTransition: 'vux-dialog',
    onShow: () => {},
    onHide: () => {}
  },
  confirm: {
    show: false,
    title: '',
    content: '',
    confirmText: '确定',
    cancelText: '取消',
    maskTransition: 'vux-fade',
    dialogTransition: 'vux-dialog',
    hideOnBlur: false,
    onCancel: () => {},
    onConfirm: () => {},
    onShow: () => {},
    onHide: () => {}
  }
}

const defaultShow = (payload) => {
  if (typeof payload === 'boolean') {
    payload = { show: payload }
  } else if (typeof payload === 'string') {
    payload = { title: payload }
  }
  return payload !== undefined && Object.keys(payload).length > 0 ? Object.assign({ show: true }, payload) : {}
}

Object.keys(storeModules).forEach(k => {
  store.registerModule(k, {
    state: storeModules[k],
    mutations: {
      [k] (state, payload) {
        payload = defaultShow(payload)
        Object.keys(payload).forEach(k => {
          state[k] = payload[k]
        })
      }
    },
    getters: {
      [k]: state => state
    }
  })
})

export default store
