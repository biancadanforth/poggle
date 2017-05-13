// Submit.jsx

// Imports
import React from 'react';

class Submit extends React.Component {

  render() {
    return (
      <button 
        className={this.props.shouldBounce ? "button bounce" : "button"}
        onClick={() => this.props.handleSubmit()}
        disabled={this.props.isDisabled}>
        <div>Submit Word</div>
      </button>
    );
  }
}

export default Submit;
