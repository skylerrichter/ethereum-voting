import _ from 'lodash'
import Web3 from 'web3'
import { DEFAULT_NODE_ADDRESS } from '../constants'

const resolver = new Promise((resolve, reject) => {
  window.addEventListener('load', () => {
    const web3 = new Web3(_.get(window.web3, 'currentProvider', new Web3.providers.HttpProvider(DEFAULT_NODE_ADDRESS)))
    resolve({
      web3
    })
  })
})

export default resolver