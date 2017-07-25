function validJSON (response) {
  return true
}

export default function (httpOptions, response, resolve, reject, options) {
  let acceptNotJSON = options && options.acceptNotJSON || false

  if (!acceptNotJSON) {
    if (validJSON(response)) {
      resolve(response)
    } else {
      reject(new Error('not json')) // 返回结果可以不是JSON格式（例如直接返回html）
    }
  } else {
    resolve(response)
  }
}
