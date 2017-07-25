import * as utils from '../utils'
const appLoading = utils.noop()

export default function (options) {
  if (options.loading) {
    return appLoading
  } else {
    return utils.noop
  }
}
