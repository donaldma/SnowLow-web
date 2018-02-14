import { USER_AUTH } from '../actions'

const INITIAL_STATE = false

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_AUTH:
      return action.payload
    default:
      return state
  }
}