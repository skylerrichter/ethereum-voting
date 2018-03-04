import { CONTRACT_CAST_VOTE, CONTRACT_GET_CANDIDATES, CONTRACT_GET_VOTES } from '../constants'
import { getCandidateList, totalVotesFor, voteForCandidate } from '../repositories/Voting'

/**
 * Cast vote.
 * @param  {string} candidate
 * @return {function}
 */
export const castVote = (candidate) => (dispatch) => {
  return voteForCandidate(candidate).then(() => {
    dispatch({
      type: CONTRACT_CAST_VOTE,
      candidate
    })
  })
}

/**
 * Get votes.
 * @param  {array} candidates
 * @return {function}
 */
export const getVotes = (candidates) => (dispatch) => {
  return Promise.all(candidates.map((candidate) => totalVotesFor(candidate))).then((votes) => {
    dispatch({
      type: CONTRACT_GET_VOTES,
      votes
    })
  })
}

/**
 * Get candidates.
 * @return {function}
 */
export const getCandidates = () => (dispatch) => {
  return getCandidateList().then((candidates) => {
    dispatch({
      type: CONTRACT_GET_CANDIDATES,
      candidates
    })
  })
}
