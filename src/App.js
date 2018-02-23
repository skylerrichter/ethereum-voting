import React, { Component } from 'react'
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
      candidates: [],
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch((e) => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')

    // Initialize the voting contract.
    const voting = contract(VotingContract)

    // Set the provider the contract will use to make transactions.
    voting.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    voting.deployed().then((instance) => {
      instance.getCandidateList.call()
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
        .then(() => Promise.all(this.state.candidates.map((candidate) => instance.totalVotesFor.call(candidate.name))))
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
      })
  }

  vote(candidate) {

    const contract = require('truffle-contract')

    // Initialize the voting contract.
    const voting = contract(VotingContract)

    // Set the provider the contract will use to make transactions.
    voting.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      voting.deployed().then((instance) => {
        instance.voteForCandidate(candidate, {from: this.state.web3.eth.accounts[0]}).then(() => {
          this.setState({
            candidates: this.state.candidates.map((x) => {
              return {
                ...x,
                votes: x.name === candidate ? parseInt(x.votes) + 1 : parseInt(x.votes)
              }
            })
          })
        })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Donuts</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              {this.state.candidates.map((candidate, i) => {
                return (
                  <div>
                    {candidate.name} - {candidate.votes}
                    <button onClick={() => this.vote(candidate.name)}>
                      Vote
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
