import { CONTRACT_CAST_VOTE, CONTRACT_GET_CANDIDATES, CONTRACT_LOAD } from '../constants'

export default (state = {}, action) => {
  switch(action.type) {
    case CONTRACT_GET_CANDIDATES:
      return {
        ...state,
        candidates: action.candidates
      }
    case CONTRACT_CAST_VOTE:
      return {
        ...state,
        voted: true
      }
    case CONTRACT_LOAD:
      return {
        ...state,
        instance: action.instance,        
      }
    default:
      return state
  }
}