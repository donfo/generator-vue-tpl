require('./check-versions')()

process.env.NODE_ENV = 'releasing'

var fs = require('fs')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for release...')
spinner.start()

var statsConfig = {
  // context: false,
  // hash: false,
  // version: false,
  timings: true,
  // assets: false,
  // cached: false,
  // reasons: false,
  // source: false,
  // errorDetails: false,
  // chunkOrigins : false,
  // modulesSort: false,
  // chunksSort : false,
  // assetsSort : false,
  colors: true,
  modules: false,
  children: false,
  chunks: false,
  chunkModules: false
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString(statsConfig) + '\n\n')

    if (config.build.packStats) {
      fs.writeFileSync(config.build.packStats, JSON.stringify(stats.toJson()))
    }
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
