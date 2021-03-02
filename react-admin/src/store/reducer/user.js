import * as types from '../action-types/index'

const countInitialState = { count: 0 }
export default (state = countInitialState, action) => {
  switch (action.type) {
    case types.ADD:
      return { count: state.count + 1 }
    case types.MINS:
      return { count: state.count - 1 }
    default:
      return state
  }
}
