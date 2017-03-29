export default function config (axios) {
  let defaultConfig = {}

  // cancellation config
  const CancelToken = axios.CancelToken
  const cancelTokenSource = CancelToken.source()
  defaultConfig.cancelToken = cancelTokenSource.token

  // // Add a request interceptor
  // axios.interceptors.request.use(function (config) {
  //   // Do something before request is sent
  //   return config
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error)
  // })
  //
  // // Add a response interceptor
  // axios.interceptors.response.use(function (response) {
  //   // Do something with response data
  //   return response
  // }, function (error) {
  //   // Do something with response error
  //   return Promise.reject(error)
  // })

  return defaultConfig
}
