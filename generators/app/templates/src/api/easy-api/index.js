import axios from 'axios'
import co from 'co'

import loadingFunc from './components/loading'

import errorHandler from './interceptors/error-handler'
import jsonCheck from './interceptors/json-check'

import * as utils from './utils'

import configAxios from './config-axios.js'

const DEFAULT_AXIOS_CONFIG = configAxios(axios)
const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

export default class EasyApi {
  constructor (options = {}) {
    this.selfOptions = options
    this.selfOptions.defaultAxiosConfig = this.selfOptions.defaultAxiosConfig || DEFAULT_AXIOS_CONFIG

    this.throttleList = []
    this.preInterceptors = []
    this.interceptors = [jsonCheck]

    HTTP_METHODS.map((method) => {
      this[method] = (url, httpOptions, options) => {
        this.call(method, url, httpOptions, options)
      }
    })
  }

  pre (func, index) {
    if (typeof index !== 'undefined') {
      this.preInterceptors.splice(index, 0, func)
    }

    this.preInterceptors.push(func)
  }

  interceptor (func, index) {
    if (typeof index !== 'undefined') {
      this.interceptors.splice(index, 0, func)
    }

    this.interceptors.push(func)
  }

  // method, url, [httpOptions], [options]
  call (method, url, httpOptions, options = {}) {
    let loading = this.selfOptions.loadingFunc || loadingFunc(options)

    let request
    let force = options.force || false
    let httpPattern = utils.makeHttpPattern(method, url, httpOptions, options)
    let index = this.throttleList.indexOf(httpPattern)
    let notPending = (index === -1)
    let axiosConfig = Object.assign(this.selfOptions.defaultAxiosConfig, { method, url }, httpOptions)

    const makeHttpPromise = (request) => {
      loading(true)
      return new Promise((resolve, reject) => {
        let runPreInterceptors = () => {
          let promisifiedPreInterceptors = this.preInterceptors.map((interceptor) => {
            return utils.promisifyPreInterceptor(interceptor, axiosConfig, options)
          })

          let gen = function* () {
            for (let i = 0, len = promisifiedPreInterceptors.length; i < len; i++) {
              yield promisifiedPreInterceptors[i]
            }
          }

          return co(gen).then(() => {
            return Promise.resolve()
          })
        }
        let runInterceptors = (response) => {
          let promisifiedInterceptors = this.interceptors.map((interceptor) => {
            return utils.promisifyInterceptor(interceptor, axiosConfig, response, options)
          })

          let gen = function* () {
            for (let i = 0, len = promisifiedInterceptors.length; i < len; i++) {
              yield promisifiedInterceptors[i]
            }
          }

          return co(gen).then(() => {
            return Promise.resolve(response)
          })
        }
        let handleSuccess = (response) => {
          request.status = 'success'
          resolve(response)
          loading(false)
        }
        let handleFail = (response) => {
          request.status = 'fail'
          errorHandler(axiosConfig, response, resolve, reject, options)
          loading(false)
        }

        runPreInterceptors().then(() => {
          axios(axiosConfig).then((response) => {
            runInterceptors(response).then(handleSuccess)
          }).catch(handleFail)
        })
      })
    }

    if (notPending) {
      request = {
        value: httpPattern,
        status: 'pending'
      }
      request.promise = makeHttpPromise(request)
      this.throttleList.push(request)
    } else {
      request = this.throttleList[index]
      if (this.throttleList[index].status !== 'pending' || force) {
        request.status = 'pending'
        request.promise = makeHttpPromise(request)
      }
    }
    return request.promise
  }
}
