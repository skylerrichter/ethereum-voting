import TruffleContract from 'truffle-contract'
import VotingContract from '../../build/contracts/Voting.json'
import store from '../store'

/**
 * Instance.
 * @return {promise}
 */
export const instance = () => {
  const voting = TruffleContract(VotingContract)
  voting.setProvider(window.web3.currentProvider)
  return voting.deployed()
}

/**
 * Get candidate list.
 * @return {promise}
 */
export const getCandidateList = () => instance().then((instance) => instance.getCandidateList())

/**
 * Total votes for.
 * @param  {string} candidate
 * @return {promise}
 */
export const totalVotesFor = (candidate) => instance().then((instance) => instance.totalVotesFor(candidate))

/**
 * Vote for candidate.
 * @param  {string} candidate
 * @return {promise}
 */
export const voteForCandidate = (candidate) => instance().then((instance) => {
 return instance.voteForCandidate(candidate, {from: store.getState().web3.account})
})