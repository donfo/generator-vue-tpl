process.env.NODE_ENV = 'testing'

var fs = require('fs')
var path = require('path')
var express = require('express')
var http = require('http')
var https = require('https')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')

var port = process.env.PORT || config.build.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  if (typeof options.filter === 'function') {
    context = options.filter
  }
  if (options.path) {
    context = options.path
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use('/', express.static(config.build.assetsRoot))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('\n' + 'Listening at http://localhost:' + port + '\n')
})
