import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import searchReducer from './searchReducer'
import authReducer from './authReducer'

export default combineReducers({
  router: routerReducer,
  searchResults: searchReducer,
  isAuthenticated: authReducer
})