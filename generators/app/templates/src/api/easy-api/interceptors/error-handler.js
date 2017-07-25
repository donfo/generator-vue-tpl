import * as utils from '../utils'
const defaultXhrErrorHandler = utils.noop()

export default function (httpOptions, response, resolve, reject, options) {
  let noErrorHandler = options.noErrorHandler
  let httpErrorHandler = options.httpErrorHandler || defaultXhrErrorHandler
  let httpErrorHandlerOptions = options.httpErrorHandlerOptions

  if (!noErrorHandler) {
    httpErrorHandler(response, httpErrorHandlerOptions)
  } else {
    reject(response)
  }
}
