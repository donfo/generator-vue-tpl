import * as types from './mutation-types'

/**
 * 基础
 * ----------------------------------------------------------------------------
 */
export const getSetting = ({ commit }, options) => {
  commit(types.SET_SETTING, options)
}
