import axios from 'axios'

let throttleList = []

export default class Throttle {
  call (method, url, config = {}) {
    let str = method + url + JSON.stringify(config)
    let index = throttleList.findIndex(ele => {
      return ele.value === str
    })
    let promise = obj => {
      return new Promise((resolve, reject) => {
        axios(Object.assign({ method, url }, config)).then(response => {
          obj.status = 'success'
          resolve(response)
        }).catch(response => {
          obj.status = 'fail'
          reject(response)
        })
      })
    }

    if (index === -1) {
      let obj = { value: str, status: 'pending' }
      obj.promise = promise(obj)
      throttleList.push(obj)
      return obj.promise
    } else {
      if (throttleList[index].status === 'pending') {
        return throttleList[index].promise
      } else {
        throttleList[index].status = 'pending'
        throttleList[index].promise = promise(throttleList[index])
        return throttleList[index].promise
      }
    }
  }
}
