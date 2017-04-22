import React from 'react';

class Square extends React.Component {
  
	constructor() {
		super();
		this.state = {
			selected: false,
		};
	}

  render() {
    return(
      <div className= {this.state.selected ? "tile tile-selected" : "tile"} onClick={() => this.setState({selected: true})}>
      <div>{this.state.value}</div>
      </div>
    )
  }
}

export default Square;