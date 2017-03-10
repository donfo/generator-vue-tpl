// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var chalk = require('chalk')
var utils = require('./utils')

try {
  var env = require('../env')
} catch (err) {
  console.log(utils.error('no env config'))
  process.exit(1)
}

var buildConfig = require('./build-config')
var isProduction = (process.env.NODE_ENV === 'production')
var backendUrl = env.backendUrl || 'http://example.com/'

module.exports = {
  build: buildConfig,
  dev: {
    env: require('./env-config/dev.env.js'),
    port: env.devPort || 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/**': {
        target: backendUrl,
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    htmlConfig: {
      title: 'test'
    }
  }
}
