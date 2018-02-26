import { connect } from 'react-redux'
import { castVote, loadContract, getCandidates, getVotes } from '../actions/contract'
import { fetchWeb3 } from '../actions/web3'
import App from '../components/App'

const initialize = () => {
  return (dispatch) => {
    return dispatch(fetchWeb3())
      .then(() => dispatch(loadContract()))
      .then(() => dispatch(getCandidates()))
  }
}

const vote = (candidate) => {
  return (dispatch) => {
    return dispatch(castVote(candidate))
      .then(() => dispatch(getVotes()))
  }
}

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: () => dispatch(initialize()),
    vote: (candidate) => dispatch(vote(candidate))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);