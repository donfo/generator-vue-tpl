import * as types from '../mutation-types'

const state = {}

const mutations = {
  [types.SET_SETTING] (state, setting) {
    let localCurrTime = Moment().format('YYYY-MM-DD HH:mm:ss')
    let serverCurrTime = setting.serverTime || localCurrTime
    state = setting
    state.serverLocalDiffTime = Moment(serverCurrTime).diff(Moment(localCurrTime))
  }
}

export default {
  state,
  mutations
}
