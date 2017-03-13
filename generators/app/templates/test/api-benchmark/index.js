// api-benchmark not installed by default
// Before this test, make sure to:
// npm install --save-dev api-benchmark

var apiBenchmark = require('api-benchmark')
var fs = require('fs')

var config = require('../../config/index')
var myServer = config.backendUrl
var myPort = config.backendPort
var basePath = '/'

var service = {
  server1: `http://${myServer}${myPort ? myPort + ':' : ''}`
}

var makeApiBenchmarks = function (resultPrefix, routes, index, options) {
  if (index === routes.length) {
    return
  }
  console.log(`${index + 1} of ${routes.length} routes`)
  var route = routes[index]
  var routesObj = {}
  routesObj[route.name] = route.route
  var cb = function (results, html) {
    fs.writeFileSync(`${resultPrefix}_${route.name}.html`, html)
    makeApiBenchmarks(resultPrefix, routes, index + 1, options)
  }
  console.log(`路由${route.name}结果保存在：${resultPrefix}_${route.name}.html`)
  makeOneRouteApiBenchmark(routesObj, cb, options)
}

var makeOneRouteApiBenchmark = function (routes, cb, options) {
  apiBenchmark.measure(service, routes, options, function(err, results){
    if (err) {
      console.log('measure err', err)
    }
    apiBenchmark.getHtml(results, function(error, html){
      if (error) {
        console.log('getHtml err', err)
      }
      cb(results, html)
    })
  })
}

var routes = [
  {
    name: 'userInfo',
    route: `${basePath}/ehr/userinfo/get.do?access_token=${accessToken}&badge=${badge}&include_avatar=1`
  },
  {
    name: 'regLeave',
    route: `${basePath}/ehr/regleave/getlist.do?access_token=${accessToken}&badge=${badge}`
  },
  {
    name: 'balance',
    route: `${basePath}/ehr/balance/getlist.do?access_token=${accessToken}&badge=${badge}`
  },
  {
    name: 'attend',
    route: `${basePath}/ehr/attend/getlist.do?access_token=${accessToken}&badge=${badge}&begin_term=2016-09-01&end_term=2016-10-10`
  },
  {
    name: 'termAttend',
    route: `${basePath}/ehr/attend/get.do?access_token=${accessToken}&badge=${badge}&term=2016-09-01`
  },
  {
    name: 'attendRank',
    route: `${basePath}/ehr/attend/getrank.do?access_token=${accessToken}&department_id=6754&fetch_child=1&begin_term=2016-07-01&end_term=2016-07-08`
  },
  {
    name: 'signIn',
    route: {
      method: 'post',
      route: `${basePath}/ehr/signin/create.do?access_token=${accessToken}`,
      data: {
        badge: badge,
        time: '2016-09-01 11:45:00',
        department_id: '6754'
      }
    }
  },
  {
    name: 'salary',
    route: `${basePath}/ehr/salary/getlist.do?access_token=${accessToken}&badge=042768&salary_password=shulinrong`
  }
]

var options = { debug: true, stopOnError: false, runMode: 'parallel', maxConcurrentRequests: 1, maxTime: 500, minSamples: 100 }

makeApiBenchmarks(`./results/ehr+${options.maxConcurrentRequests}并发+单独+${options.minSamples}样本点`, routes, 0, options)

routes= [
  {
    name: 'userInfo',
    route: {
      route: `${basePath}/ehr/userinfo/get.do?access_token=${accessToken}&badge=001228&include_avatar=1`,
      headers: {
        Connection: 'keep-alive'
      }
    }
  }
]
options = { debug: true, stopOnError: false, runMode: 'parallel', maxConcurrentRequests: 500, maxTime: 500, minSamples: 5000 }

// makeApiBenchmarks(`./results/ehr+${options.maxConcurrentRequests}并发+单独+${options.minSamples}样本点`, routes, 0, options)