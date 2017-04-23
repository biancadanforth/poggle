// Submit.jsx

// Imports
import React            from 'react';

class Submit extends React.Component {

  render() {
    return (
      <button 
        className="button"
        onClick={() => this.props.handleSubmit()}>
        <div>SUBMIT WORD</div>
      </button>
    );
  }
}

export default Submit;
