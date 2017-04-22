// app.jsx

// Imports
import React            from 'react';
import ReactDOM         from 'react-dom';

import Square           from './components/Square.jsx';

const render = ReactDOM.render;

class App extends React.Component {

  constructor() {
    super();
    // this.state = {
    // }
  }

  render() {
    return (
    	<div>
        <Square />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
