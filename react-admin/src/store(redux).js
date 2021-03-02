// 引入createStore创建store，引入applyMiddleware 来使用中间件
import { createStore } from 'redux'
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'
// import action from './action'

// import storeReducer from './reducer/index'
export const ADD = 'ADD'
export const MINS = 'MINS'
function storeReducer(state = { count: 0 }, action) {
  console.log('action', action)
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 }
    case MINS:
      return { count: state.count - 1 }
    default:
      return state
  }
}
export default createStore(storeReducer, composeWithDevTools())
