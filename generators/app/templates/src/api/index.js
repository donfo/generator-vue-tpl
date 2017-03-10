import Throttle from './throttle'
let throttle = new Throttle()

let apiPrefix = '/api'
/**
 * 开发环境
 * ----------------------------------------------------------------------------
 */
if (process.env.NODE_ENV !== 'production') {
  exports.postLogin = config => {
    return throttle.call('post', `${apiPrefix}/login`, config)
  }
  exports.postLogout = config => {
    return throttle.call('post', `${apiPrefix}/logout`, config)
  }
}

/**
 * 基础
 * ----------------------------------------------------------------------------
 */
exports.getSetting = config => {
  return throttle.call('get', `${apiPrefix}/setting`, config)
}
