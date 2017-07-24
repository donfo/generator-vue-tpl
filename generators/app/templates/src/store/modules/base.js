import { browserVersions } from '../../utils/browser'

const someUrlRegEx = new RegExp(`^${location.origin}/#/member/wallet/[^/]*$`)

const state = {
  notSomeUrl: typeof firstHref !== 'undefined' ? !someUrlRegEx.test(firstHref) : 'no firstHref',
  browserVersions: browserVersions()
}

export default {
  state
}
