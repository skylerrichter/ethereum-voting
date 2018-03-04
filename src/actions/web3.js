import _ from 'lodash'
import { WEB3_GET_ACCOUNT } from '../constants'

/**
 * Get account.
 * @return {function}
 */
export const getAccount = () => (dispatch, getState) => {
  const account = _.get(window.web3, 'eth.accounts.0')
  if (getState().web3.account !== account) {
    dispatch({
      type: WEB3_GET_ACCOUNT,
      account
    })
  }
}