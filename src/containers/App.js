import { connect } from 'react-redux'
import { castVote, getCandidates, getVotes } from '../actions/contract'
import { getAccount } from '../actions/web3'
import App from '../components/App'

/**
 * Vote for.
 * @param  {string} candidate
 * @return {promise}
 */
const voteFor = (candidate) => {
  return (dispatch) => {
    return dispatch(castVote(candidate))
      .then(() => dispatch(getVotes()))
  }
}

/**
 * Map state to props.
 * @param  {object} state
 * @return {object}
 */
const mapStateToProps = (state) => {
  return {
    contract: state.contract,
    web3: state.web3
  }
}

/**
 * Map dispatch to props.
 * @param  {function} dispatch
 * @return {function}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    getAccount: () => dispatch(getAccount()),
    getCandidates: () => dispatch(getCandidates()),
    voteFor: (candidate) => dispatch(voteFor(candidate))
  }
}

// Connect.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)