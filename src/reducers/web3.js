import { WEB3_LOAD } from '../constants'

/**
 * Example state:
 * 
 * web3: {
 *   instance: {
 *     currentProvider: {},
 *     eth: {
 *       accounts: [
 *         '0x627306090abab3a6e1400e9345bc60c78a8bef57'
 *       ]
 *     }    
 *   }
 * }
 */

export default (state = {}, action) => {
  switch(action.type) {
    case WEB3_LOAD:
      return {
        instance: action.instance
      }
    default:
      return state
  }
}