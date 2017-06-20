import { browserVersions } from '../../utils/browser'

const someUrlRegEx = new RegExp(`^${location.origin}/#/member/wallet/[^/]*$`)

const state = {
  notSomeUrl: !someUrlRegEx.test(firstHref),
  browserVersions: browserVersions()
}

export default {
  state
}
