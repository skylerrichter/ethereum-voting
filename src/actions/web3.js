import Web3 from 'web3'
import { WEB3_LOAD } from '../constants'

export const fetchWeb3 = () => {
  return (dispatch) => {
    return new Promise(function(resolve, reject) {
      window.addEventListener('load', function() {
        var web3 = window.web3

        if (typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider)
          dispatch({
            type: WEB3_LOAD,
            instance: web3
          })
          
          resolve()
        } else {

          var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')

          web3 = new Web3(provider)

          dispatch({
            type: WEB3_LOAD,
            instance: web3
          })

          resolve()
        }
      })
    })
  }
}