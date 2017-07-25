# easy-api

## 特性

+ 使用axios作为api调用的http工具
+ 默认同时只有一个完全相同的http请求，减少服务器压力
+ 支持默认的filter和自定义的filter

## 改进

+ http-token包含内容太多，需要压缩
+ 将data处理为可选参数

## 示例

+ 全局初始化实例

> 由于相同项目对接口的处理要求应该相同，所以一般情况全局初始化一个EasyApi实例

```javascript
import EasyApi from './libs/easy-api/index'
import preInterceptors from './libs/easy-api/interceptors/pre/index'
import logger from './libs/easy-api/interceptors/logger'
const ea = new EasyApi({
  loadingFunc: ...,
  noErrorHandler: false,
  httpErrorHandler: (index, options) => {},
  httpErrorHandlerOptions: () => {},
})
window.ea = ea

ea.interceptor((httpOptions, response, resolve, reject, options) => {
  response.test = 'a'
  resolve(response)
})
ea.interceptor(logger)
ea.pre(preInterceptors({ boolUrlify: true, arrayToCvs: true }))
```

+ 需要处调用
```javascript
function getData (urlOption, query, options, httpOptions = {}) {
  return ea.call('get', `/api/data/${urlOption.id}/subordinates`, { params: query }, options)
}
  
getData({ departmentId: this.departmentId }, { 'p1 | bool': true, 'p2 | array': [1, 2] }, { loading: true }).then((data) => {
  console.log(data)
})
```