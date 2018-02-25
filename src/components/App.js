import React, { Component } from 'react'
import _ from 'lodash'

import '../css/open-sans.css'
import '../App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      choice: null
    }
  }

  componentWillMount() {
    this.props.load()
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
            {_.get(this.props.contract, 'candidates', []).map((candidate, i) => {
              return (
                <div className="choice" key={i}>
                  <input 
                    type="radio" 
                    id={`choice_${i}`} 
                    name="choice" 
                    value={candidate} 
                    onChange={(event) => this.setState({choice: event.target.value})}/>
                  <label htmlFor={`choice_${i}`}>{candidate}</label>
                </div>
              )
            })}
          </div>
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
