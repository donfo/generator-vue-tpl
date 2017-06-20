export default function (Vue) {
  // 开发过程需要的
  if (!process.env.IS_BUILD) {
    // const installDevUtils = require('./utils/_self/devUtils')
    // installDevUtils()
    // var startMockServer = require('./api/mock/index')
    // startMockServer()
  } else if (process.env.env === 'production') {
    // 错误监控——线上环境打开
    // var installSentryUtils = require('./utils/_self/sentryUtils')
    // installSentryUtils()
  }
}
