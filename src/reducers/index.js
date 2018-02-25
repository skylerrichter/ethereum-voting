import { combineReducers } from 'redux'
import contract from './contract'
import web3 from './web3'

export default combineReducers({
  contract,
  web3
});