export default (Vue) => {
  // require('babel-polyfill')
  require('libs/fastclick').attach(document.body)
  if (typeof window._ === 'undefined') {
    window._ = require('lodash/lodash.min.js')
  }
  if (typeof window.Moment === 'undefined') {
    window.Moment = require('moment/min/moment.min.js')
  }
  // if (typeof window.Decimal === 'undefined') {
  //   window.Decimal = require('decimal.js/decimal.min.js')
  // }

  // 如果没有引入lodash或underscore等库，建立一些常用方法
  if (typeof window._ === 'undefined') {
    window._ = {}
    window._.noop = () => {}
  }
}
