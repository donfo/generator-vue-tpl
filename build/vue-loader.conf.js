var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var webpack = require('webpack')
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('postcss-import')({ addDependency: webpack }),
    require('postcss-cssnext')(),
    // require('autoprefixer')({
    //   browsers: ['last 2 versions']
    // })
    require('postcss-salad')()
  ]
}
