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
    return (
    	<div className="container">
        <header className="header">
          <img src="/images/poggle.png" alt="Poggle" />
        </header>
        <main className="game-area">
        <Board />
        <div>{/*status*/}</div>
        <ol>{/*add later*/}</ol>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
