import React  from 'react';

import Square from './Square.jsx';

class Board extends React.Component {

	constructor() {
		super();
		this.state = {
			lastClicked: null,
			selected: Array.apply(null, Array(25)).map(Boolean.prototype.valueOf, false),
			history: []
		}
	}

	handleLastClicked(id) {
		// can't assign directly into elements of an object in setState, i.e. this.setState({selected[id]: true}) doesn't work.
		let newSelected = this.state.selected.slice();
		const prevId = this.state.lastClicked;
		if (prevId) {
			const adjTileIds = [prevId, prevId-6, prevId-5, prevId-4, prevId-1, prevId+1, prevId+4, prevId+5, prevId+6];
			// if the clicked tile is adjacent to the last clicked tile:
			if (adjTileIds.indexOf(id) !== -1) {
				// if tile is not selected, select it and update lastClickedId
				if (!(newSelected[id])) {
					newSelected[id] = true;
					this.setState((prevState, props) => {
						prevState.history.push(id);
						return {lastClicked: id, selected: newSelected, history: prevState.history};
					});
				// if tile is selected AND it was the last clicked tile, deselect it and update lastClicked to have its previous value
				} else if (id === this.state.lastClicked) {
					newSelected[id] = false;
					this.setState((prevState, props) => {
						// pop the last element off history
						prevState.history.pop();
						let lastLastClicked = prevState.history[prevState.history.length -1];
						return {lastClicked: lastLastClicked , selected: newSelected, history: prevState.history};
					});
				}
			}
		} else {
			newSelected[id] = true;
			this.setState((prevState, props) => {
				prevState.history.push(id);
				return {lastClicked: id, selected: newSelected, history: prevState.history};
			});
		}
	}

  renderSquare(id) {
  	let newSelected = this.state.selected.slice();
  	return <Square value={id} lastClicked={(id) => this.handleLastClicked(id)} isSelected={newSelected[id]}/>;
  }
  
  render() {
    return(
      <div>
      <div className="row">
      	{this.renderSquare(0)}
      	{this.renderSquare(1)}
      	{this.renderSquare(2)}
      	{this.renderSquare(3)}
      	{this.renderSquare(4)}
      </div>
      <div className="row">
      	{this.renderSquare(5)}
      	{this.renderSquare(6)}
      	{this.renderSquare(7)}
      	{this.renderSquare(8)}
      	{this.renderSquare(9)}
      </div>
      <div className="row">
      	{this.renderSquare(10)}
      	{this.renderSquare(11)}
      	{this.renderSquare(12)}
      	{this.renderSquare(13)}
      	{this.renderSquare(14)}
      </div>
      <div className="row">
      	{this.renderSquare(15)}
      	{this.renderSquare(16)}
      	{this.renderSquare(17)}
      	{this.renderSquare(18)}
      	{this.renderSquare(19)}
      </div>
      <div className="row">
      	{this.renderSquare(20)}
      	{this.renderSquare(21)}
      	{this.renderSquare(22)}
      	{this.renderSquare(23)}
      	{this.renderSquare(24)}
      </div>
      </div>
    )
  }
}

export default Board;