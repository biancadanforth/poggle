// app.jsx

// Imports
import React            from 'react';
import ReactDOM         from 'react-dom';

import Board            from './components/Board.jsx';

const render = ReactDOM.render;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentWord: ''
    }
  }

  getCurrentWord(word) {
    this.setState({currentWord: word});
  }

  render() {
    return (
    	<div className="container">
        <header className="header">
          <img src="/images/poggle.png" alt="Poggle" />
        </header>
        <main className="game-area">
          <div>
            <div className="blue-area">
            <Board currentWord={(word) => this.getCurrentWord(word)} />
            </div>
            <div className="word-area">
              <div className="current-header">Current Word</div>
              <div className="current-word">{this.state.currentWord}</div>
            </div>
            <div className="button"><div>SUBMIT WORD</div></div>
          </div>
          <div className="score-box">
              <div className="word-list">
                <div class="words"></div>
                <div class="scores"></div>
              </div>
              <div className="total-score"></div>
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
