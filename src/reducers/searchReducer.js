import { GET_SEARCH_RESULTS } from '../actions'

const INITIAL_STATE = null

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_SEARCH_RESULTS:
      if (action.error) {
        return {
          error: action.payload.response.data.error
        }
      } else {
        return action.payload.data
      }
    default:
      return state
  }
}