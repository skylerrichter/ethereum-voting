import { CONTRACT_CAST_VOTE, CONTRACT_GET_CANDIDATES, CONTRACT_LOAD } from '../constants'
import store from '../store'

/**
 * Example state:
 *
 * contract: {
 *   candidates: [
 *     'Cartems',
 *     'Lucky\'s'
 *   ],
 *   instance: {},
 *   voted: true
 * }
 */

export default (state = {}, action) => {
  switch(action.type) {
    case CONTRACT_GET_CANDIDATES:
      return {
        ...state,
        candidates: action.candidates.map((candidate) => store.getState().web3.instance.toAscii(candidate))
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