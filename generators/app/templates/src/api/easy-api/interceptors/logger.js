import * as utils from '../utils'
let logs = {}
window.logs = logs

export default function (httpOptions, response, resolve, reject, options) {
  let pattern = utils.makeHttpPattern(response.config.method, response.config.url, options, httpOptions)

  let url = response.config.url

  if (typeof logs[url] === 'undefined') {
    logs[url] = []
  }

  logs[url].push({
    response,
    pattern
  })
  resolve()
}
