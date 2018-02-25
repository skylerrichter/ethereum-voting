import TruffleContract from 'truffle-contract'
import VotingContract from '../../build/contracts/Voting.json'
import { CONTRACT_GET_CANDIDATES, CONTRACT_CAST_VOTE, CONTRACT_LOAD } from '../constants'

export const castVote = (candidate) => (dispatch, getState) => {
  getState().contract.instance.voteForCandidate(candidate, {from: getState().web3.instance.eth.accounts[0]})
    .then(() => {
      dispatch({
        type: CONTRACT_CAST_VOTE
      })
    })
}

export const getCandidates = () => (dispatch, getState) => {
  getState().contract.instance.getCandidateList.call()
    .then((candidates) => {
      dispatch({
        type: CONTRACT_GET_CANDIDATES,
        candidates
      })
    })
}

export const loadContract = () => (dispatch, getState) => {
  const voting = TruffleContract(VotingContract)
  voting.setProvider(getState().web3.instance.currentProvider)
  return voting.deployed()
    .then((instance) => {
      dispatch({
        type: CONTRACT_LOAD,
        instance
      })
    })
}