import _ from 'lodash'
import { WEB3_GET_ACCOUNT } from '../constants'
import getWeb3 from '../utilities/getWeb3'

/**
 * Get account.
 * @return {function}
 */
export const getAccount = () => (dispatch, getState) => {
  getWeb3.then(({ web3 }) => {
    const account = _.get(web3, 'eth.accounts.0')
    if (getState().web3.account !== account) {
      dispatch({
        type: WEB3_GET_ACCOUNT,
        account
      })
    }
  })
}