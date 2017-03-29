const TOKEN_REGEX = /\|/
const RANGE = ['data', 'params']

function handle (range, httpOptions) {
  let obj = httpOptions[range]
  if (typeof obj === 'undefined') {
    return
  }

  let keys = Object.keys(obj)

  keys.map((str) => {
    if (TOKEN_REGEX.test(str)) {
      let items = str.split('|')

      let key = items[0].trim()
      let type = items[1].trim()

      if (type === 'bool') {
        obj[key] = obj[str] ? '1' : '0'
        delete obj[str]
      }
    }
  })
}

export default function (httpOptions) {
  RANGE.map((r) => {
    handle(r, httpOptions)
  })
}
