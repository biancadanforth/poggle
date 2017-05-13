// app.jsx

// Imports
import React    from 'react';
import ReactDOM from 'react-dom';

import Board    from './components/Board.jsx';

const render = ReactDOM.render;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentWord: '',
      submittedWords: [],
      score: [],
      totalScore: 0,
      shouldBounce: false
    }
  }

  getCurrentWord(word) {
    this.setState({currentWord: word});
  }

  handleSubmit() {
    let submittedWord = this.state.currentWord;
    let submittedWords = this.state.submittedWords.slice();
    // check for duplicate word:
    if (submittedWords.indexOf(submittedWord) !== -1) {
      // bounce animation on submit button to indicate an invalid word
      this.setState({shouldBounce: true});
      setTimeout(() => this.setState({shouldBounce: false})
      , 1000);
    } else {
      let score = this.calculateScore(submittedWord);
      this.setState((prevState) => {
        prevState.submittedWords.push(this.state.currentWord);
        prevState.score.push(score);
        prevState.totalScore += score;
        return {
          currentWord: '',
          submittedWords: prevState.submittedWords,
          score: prevState.score,
          totalScore: prevState.totalScore
        }
      });
    }
  }

  calculateScore(submittedWord) {
    let wordLength = this.state.currentWord.length;
    switch (wordLength) {
      case 3:
        return 1;
        break;
      case 4:
        return 2;
        break;
      case 5:
        return 3;
        break;
      case 6:
        return 4;
        break;
      case 7:
        return 5;
        break;
      default:
        return 6;
        break;
    }
  }

  render() {
    let submittedWords = this.state.submittedWords.slice();
    let wordList = [];
    for (let i = 0; i < submittedWords.length; i++) {
      wordList.push(<p key={i} className="submitted">{submittedWords[i]}</p>);
    }

    let submittedScores = this.state.score.slice();
    let scoreList = [];
    for (let i = 0; i < submittedScores.length; i++) {
      scoreList.push(<p key={i} className="submitted">{submittedScores[i]}</p>);
    }

    return (
    	<div className="container">
        <header className="header">
          <img src="/images/poggle.png" alt="Poggle" />
        </header>
        <main className="game-area">
          <Board 
            currentWord={(word) => this.getCurrentWord(word)}
            handleSubmit={() => this.handleSubmit()}
            shouldBounce={this.state.shouldBounce} />
          <div className="score-box">
              <div className="word-list">
                <div className="words">
                <h2>Word</h2>
                  {wordList}
                </div>
                <div className="scores">
                <h2>Score</h2>
                {scoreList}
                </div>
              </div>
              <div className="total-score">
                <h2>Total Score</h2>
                <span>{this.state.totalScore}</span>
              </div>
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
