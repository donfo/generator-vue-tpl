export const makeHttpPattern = (method, url, options, httpOptions) => {
  let str = method + url + window.location
  str = options !== undefined ? str + JSON.stringify(options) : str
  str = httpOptions !== undefined ? str + JSON.stringify(httpOptions) : str

  return str
}

export const noop = () => {}

export const promisifyPreInterceptor = (func, httpOptions, options) => {
  return new Promise((resolve, reject) => {
    func(httpOptions, resolve, reject, options)
  })
}

export const promisifyInterceptor = (func, httpOptions, response, options) => {
  return new Promise((resolve, reject) => {
    func(httpOptions, response, resolve, reject, options)
  })
}

export const isObject = (o) => {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export const isArray = (o) => {
  return Object.prototype.toString.call(o) === '[object Array]'
}

export const warn = (str) => {
  console.warn('[http] ' + str)
}
