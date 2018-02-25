import React, { Component } from 'react'
import _ from 'lodash'

import '../css/app.css'
import '../css/open-sans.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      choice: null
    }
  }

  componentWillMount() {
    this.props.load().then(() => {
      setInterval(() => {
        this.setState({
          account: _.get(this.props.web3, 'instance.eth.accounts.0', null)
        })
      }, 1000)
    })
  }

  render() {
    if (_.get(this.props.contract, 'voted', false)) {
      return (
        <div className="App">
          <main>
            <p>Thanks for voting!</p>
          </main>
        </div>
      )
    }
    return (
      <div className="App">
        <main>
          <p>Who serves the best donut in Vancouver?</p>
          <div className="panel">
            {_.get(this.props.contract, 'candidates', []).map((candidate) => {
              return (
                <div className="choice" key={candidate}>
                  <input 
                    type="radio" 
                    id={candidate} 
                    name="choice" 
                    value={candidate} 
                    onChange={(event) => this.setState({choice: event.target.value})}/>
                  <label htmlFor={candidate}>{candidate}</label>
                </div>
              )
            })}
          </div>
          <small>{this.state.account ? `address: ${this.state.account}` : 'Connecting to MetaMask.'}</small>
          <button 
            onClick={() => this.props.castVote(this.state.choice)} 
            disabled={this.state.choice === null}>
            Submit my vote!
          </button>
        </main>
      </div>
    );
  }

}

export default App
