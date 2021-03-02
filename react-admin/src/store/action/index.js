import * as types from '../action-types/index'

export default {
  add() {
    return { type: types.ADD }
  },
  mins() {
    return { type: types.MINS }
  },
  getCon() {
    return dispatch => {
      setTimeout(() => {
        dispatch({ type: types.ADD })
        console.log('thunk执行了')
      }, 3000)
    }
  }
}
