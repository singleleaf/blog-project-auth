import * as types from '../action-types/index'

const countInitialState = { count: 0, con: '' }
export default (state = countInitialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case types.ADD:
      return { count: state.count + 2 }
    case types.MINS:
      return { count: state.count - 2 }
    case types.CON:
      return { con: action.text }
    default:
      return state
  }
}
