import { CONTRACT_CAST_VOTE, CONTRACT_GET_VOTES, CONTRACT_GET_CANDIDATES } from '../constants'

/**
 * Example state:
 *
 * contract: {
 *   candidates: [
 *     'Cartems',
 *     'Lucky\'s'
 *   ],
 *   voted: true,
 *   votes: [
 *     4,
 *     8
 *   ]
 * }
 */

/**
 * Contract.
 * @param  {Object} state
 * @param  {string} options.type
 * @param  {array} options.candidates
 * @param  {array} options.votes
 * @return {object}
 */
export default (state = { }, { type, candidates, votes }) => {
  switch (type) {
    case CONTRACT_GET_CANDIDATES:
      return {
        ...state,
        candidates
      }
    case CONTRACT_GET_VOTES:
      return {
        ...state,
        // Convert Solidity BigNumber to JavaScript number.
        votes: votes.map((count) => count.toNumber())
      }
    case CONTRACT_CAST_VOTE:
      return {
        ...state,
        voted: true
      }
    default:
      return state
  }
}