import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
// import player from './playerReducer';

export default combineReducers({
  router: routerReducer,
  counter,
})
