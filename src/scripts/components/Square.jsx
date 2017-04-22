import React from 'react';

class Square extends React.Component {
  
	constructor() {
		super();
		this.state = {
			selected: false,
		};
	}

	handleClick() {
		// if tile is not selected, select it and update lastClickedId
		if (!(this.state.selected)) {
			this.setState({selected: true});
			this.props.lastClicked(this.props.value);
		}
		// if tile is selected AND it was the last clicked tile, deselect it
		(this.state.selected && this.props.value === this.props.lastClickedId) ? this.setState({selected: false}) : null;
	}

  render() {
    return(
      <div className= {this.state.selected ? "tile tile-selected" : "tile"} onClick={this.handleClick.bind(this)}>
      <div>{this.state.value}</div>
      </div>
    )
  }
}

export default Square;