import _ from 'lodash'
import { WEB3_GET_ACCOUNT } from '../constants'
import getWeb3 from '../utilities/getWeb3'

/**
 * Get account.
 * @return {function}
 */
export const getAccount = () => (dispatch, getState) => {
  getWeb3.then(({ web3 }) => {
    web3.eth.getAccounts((error, accounts) => {
      if (getState().web3.account !== accounts[0]) {
        dispatch({
          type: WEB3_GET_ACCOUNT,
          account: accounts[0]
        })
      }
    })
  })
}