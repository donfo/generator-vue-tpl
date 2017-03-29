import arrayToCsv from './array-to-csv'
import booleanUrlify from './boolean-urlify'

export default (options) => {
  let interceptors = []

  options.arrayToCvs && interceptors.push(arrayToCsv)
  options.boolUrlify && interceptors.push(booleanUrlify)

  return (httpOptions, resolve, reject, options) => {
    interceptors.map((interceptor) => {
      interceptor(httpOptions)
    })
    resolve()
  }
}
