var path = require('path')

module.exports = (function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        env: require('./env-config/prod.env.js'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        packStats: path.resolve(__dirname, '../pack-stats.json'),
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
        htmlConfig: {
          title: 'test',
          baiduAnalysis: '11111'
        }
      }
    case 'testing':
      return {
        port: 8085,
        env: require('./env-config/test.env.js'),
        index: path.resolve(__dirname, '../dist-test/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist-test'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        packStats: path.resolve(__dirname, '../pack-stats.json'),
        bundleAnalyzerReport: process.env.npm_config_report,
        htmlConfig: {
          title: 'test'
        }

      }
    case 'releasing':
      return {
        env: require('./env-config/release.env.js'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        packStats: path.resolve(__dirname, '../pack-stats.json'),
        bundleAnalyzerReport: process.env.npm_config_report,
        htmlConfig: {
          title: 'test'
        }
      }
    default:
      return {
        env: require('./env-config/prod.env.js'),
        index: path.resolve(__dirname, '../dist/index.html'),
        redPacketIndex: path.resolve(__dirname, '../dist/red-packet.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '',
        productionSourceMap: true,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        packStats: path.resolve(__dirname, '../pack-stats.json'),
        bundleAnalyzerReport: process.env.npm_config_report
      }
  }
})()