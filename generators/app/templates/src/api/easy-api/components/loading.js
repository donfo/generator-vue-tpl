import { appLoading } from '../../../utils/..'  // 还没有
import * as utils from '../utils'

export default function (options) {
  if (options.loading) {
    return appLoading
  } else {
    return utils.noop
  }
}
