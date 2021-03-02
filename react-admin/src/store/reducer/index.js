import { combineReducers } from 'redux'
import menu from './menu'
import user from './user'

const rootReducer = combineReducers({
  menu,
  user
})

export default rootReducer
