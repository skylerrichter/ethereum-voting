import { WEB3_GET_ACCOUNT } from '../constants'

/**
 * Example state:
 * 
 * web3: {
 *   account: '0x627306090abab3a6e1400e9345bc60c78a8bef57'
 * }
 */

/**
 * Web3.
 * @param  {Object} state
 * @param  {string} options.type
 * @param  {string} options.account
 * @return {object}
 */
export default (state = { }, { type, account, network }) => {
  switch (type) {
    case WEB3_GET_ACCOUNT:
      return {
        account
      }
    default:
      return state
  }
}