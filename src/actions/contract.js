import TruffleContract from 'truffle-contract'
import VotingContract from '../../build/contracts/Voting.json'
import { CONTRACT_GET_CANDIDATES, CONTRACT_CAST_VOTE, CONTRACT_LOAD } from '../constants'

export const castVote = (candidate) => {
  return (dispatch, getState) => {
    getState().contract.instance.voteForCandidate(candidate, {from: getState().web3.instance.eth.accounts[0]})
      .then(() => {
        dispatch({
          type: CONTRACT_CAST_VOTE
        })
      })
  }  
}

export const getCandidates = () => {
  return (dispatch, getState) => {
    getState().contract.instance.getCandidateList.call()
      .then((candidateList) => {
        dispatch({
          type: CONTRACT_GET_CANDIDATES,
          candidates: candidateList.map((candidate) => getState().web3.instance.toAscii(candidate))
        })
      })
  }
}

export const loadContract = () => {
  return (dispatch, getState) => {
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
}