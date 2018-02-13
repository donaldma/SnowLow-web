import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import searchReducer from './searchReducer'

export default combineReducers({
  router: routerReducer,
  searchResults: searchReducer
})