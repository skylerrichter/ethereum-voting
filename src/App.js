import React, { Component } from 'react'
import TruffleContract from 'truffle-contract'
import VotingContract from '../build/contracts/Voting.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      voted: false,
      choice: null,
      candidates: [],
      contract: null,
      web3: null
    }
  }

  componentWillMount() {
    getWeb3.then((results) => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
    }).catch((e) => {
      console.log(e)
    })
  }

  instantiateContract() {
    const voting = TruffleContract(VotingContract)
    voting.setProvider(this.state.web3.currentProvider)
    voting.deployed().then((instance) => {
      this.setState({
        contract: instance
      })
      this.fetchCandidates()
    })
  }

  fetchCandidates() {
     this.state.contract.getCandidateList.call()
      .then((candidateList) => {
        this.setState({
          candidates: candidateList.map((candidate) => {
            return {
              name: this.state.web3.toAscii(candidate),
              votes: 0
            }
          })
        })
      })
      .then(() => Promise.all(this.state.candidates.map((candidate) => this.state.contract.totalVotesFor.call(candidate.name))))
      .then((votes) => {
        this.setState({
          candidates: this.state.candidates.map((candidate, i) => {
            return {
              name: candidate.name,
              votes: votes[i].toString()
            }
          })
        })
      })
  }
  
  castVote() {
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.contract.voteForCandidate(this.state.choice, {from: this.state.web3.eth.accounts[0]}).then(() => {
        this.setState({
          voted: true,
          candidates: this.state.candidates.map((x) => {
            return {
              ...x,
              votes: x.name === this.state.choice ? parseInt(x.votes, 10) + 1 : parseInt(x.votes, 10)
            }
          })
        })
      })
    })
  }

  getPrecent() {
    const votes = this.state.candidates.find((candidate) => candidate.name === this.state.choice).votes
    const total = this.state.candidates.reduce((total, candidate) => total + candidate.votes, 0)
    return ((votes / total) * 100).toFixed()
  }

  render() {
    return (
      <div className="App">
        <main>
          { !this.state.voted ? (
            <div>
              <p>Who serves the best donut in Vancouver?</p>
              <div className="panel">
                {this.state.candidates.map((candidate, i) => {
                  return (
                    <div className="choice" key={i}>
                      <input type="radio" id={`choice_${i}`} name="choice" value={candidate.name} onChange={(event) => this.setState({choice: event.target.value})}/>
                      <label htmlFor={`choice_${i}`}>{candidate.name}</label>
                    </div>
                  )
                })}
              </div>
              <button onClick={() => this.castVote()} disabled={this.state.choice === null}>Submit my vote!</button>
            </div>
          ) : (
            <div><p>{this.getPrecent()}% of voters would agree!</p></div>
          )}
        </main>
      </div>
    );
  }
}

export default App
