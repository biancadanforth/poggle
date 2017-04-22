// app.jsx

// Imports
import React            from 'react';
import ReactDOM         from 'react-dom';

import Board            from './components/Board.jsx';

const render = ReactDOM.render;

class App extends React.Component {

  constructor() {
    super();
    // this.state = {
    // }
  }

  render() {
    const currentWord = "temp";
    return (
    	<div className="container">
        <header className="header">
          <img src="/images/poggle.png" alt="Poggle" />
        </header>
        <main className="game-area">
        <div className="blue-area">
        <Board />
        </div>
        <div className="word-area">
          <div className="current-header">Current Word</div>
          <div className="current-word">{currentWord}</div>
          <div>{/*status*/}</div>
          <ol>{/*add later*/}</ol>
        </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
