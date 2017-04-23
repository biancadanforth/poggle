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
      currentWord: '',
      submittedWords: [],
      score: [],
      totalScore: 0,
      shouldReset: false
    }
  }

  getCurrentWord(word) {
    this.setState({currentWord: word});
  }

  handleSubmit() {
    console.log("test");
    let submittedWord = this.state.currentWord;
    let score = this.calculateScore(submittedWord);
    this.setState((prevState) => {
      prevState.submittedWords.push(this.state.currentWord);
      prevState.totalScore += score;
      return {
        currentWord: '',
        submittedWords: prevState.submittedWords,
        score: score,
        totalScore: prevState.totalScore
      }
    }, this.resetBoard);
  }

  calculateScore(submittedWord) {

  }

  render() {
    return (
    	<div className="container">
        <header className="header">
          <img src="/images/poggle.png" alt="Poggle" />
        </header>
        <main className="game-area">
          <Board 
            currentWord={(word) => this.getCurrentWord(word)}
            shouldReset={this.state.shouldReset}
            selected={this.state.selected}
            handleSubmit={() => this.handleSubmit()} />
          <div className="score-box">
              <div className="word-list">
                <div className="words">
                  {this.state.submittedWords}
                </div>
                <div className="scores"></div>
              </div>
              <div className="total-score"></div>
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
