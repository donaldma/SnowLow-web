import axios from 'axios'

export const GET_SEARCH_RESULTS = 'get_search_results'
export const USER_AUTH = 'user_auth'
export const ROOT_URL = 'https://096w2ub6g4.execute-api.us-east-1.amazonaws.com/prod'

export function getSearchResults(searchTerm, gender) {
  const genderPath = gender ? `?gender=${gender}` : ''
  const request = axios.get(`${ROOT_URL}/search/${searchTerm}${genderPath}`)

  return {
    type: GET_SEARCH_RESULTS,
    payload: request
  }
}

export function userHasAuthenticated(authenticated) {
  return {
    type: USER_AUTH,
    payload: authenticated
  }
}