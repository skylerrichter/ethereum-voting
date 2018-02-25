import { connect } from 'react-redux'
import { castVote, loadContract, getCandidates } from '../actions/contract'
import { fetchWeb3 } from '../actions/web3'
import App from '../components/App'

const load = () => {
  return (dispatch) => {
    return dispatch(fetchWeb3())
      .then(() => dispatch(loadContract()))
      .then(() => dispatch(getCandidates()))
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
    castVote: (candidate) => dispatch(castVote(candidate)),
    load: () => dispatch(load())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);