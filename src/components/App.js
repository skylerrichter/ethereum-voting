import React, { Component } from 'react'
import _ from 'lodash'

class App extends Component {

  /**
   * Constructor.
   * @param  {props} props
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      choice: null
    }
  }

  /**
   * Start poll
   * @return {void}
   */
  startPoll() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.props.getAccount()
      }, 1000)
    }  
  }

  /**
   * Component will mount.
   * @return {void}
   */
  componentWillMount() {
    this.props.getCandidates().then(() => this.startPoll())
  }

  /**
   * Stop poll.
   * @return {void}
   */
  stopPoll() {
    clearInterval(this.interval)
  }

  /**
   * Component will unmount.
   * @return {void}
   */
  componentWillUnmount() {
    if (this.interval) {
      this.stopPoll()
    }
  }

  /**
   * Render.
   * @return {object}
   */
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
          <small>{this.props.web3.account ? `address: ${this.props.web3.account}` : 'Connecting to MetaMask.'}</small>
          <button 
            onClick={() => this.props.voteFor(this.state.choice)} 
            disabled={this.state.choice === null}>
            Submit my vote!
          </button>
        </main>
      </div>
    );
  }

}

export default App
