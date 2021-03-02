// 引入createStore创建store，引入applyMiddleware 来使用中间件
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// 安装redux-devtools-extension的可视化工具。
// import { composeWithDevTools } from 'redux-devtools-extension'

import storeReducer from './reducer/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // 设置浏览器redux扩展
const store = createStore(
  storeReducer,
  composeEnhancers(applyMiddleware(thunk))
)
export default store
