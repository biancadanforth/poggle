import React  from 'react';

import Square from './Square.jsx';

const configurations = ['aaafrs', 'aaeeee', 'aafirs', 'adennn', 'aeeeem', 'aeegmu', 'aegmnn', 'afirsy', 'bjkqxz', 'ccenst', 'ceiilt', 'ceilpt', 'ceipst', 'ddhnot', 'dhhlor', 'dhlnor', 'dhlnor', 'eiiitt', 'emottt', 'ensssu', 'fiprsy', 'gorrvw', 'iprrry', 'nootuw', 'ooottu'];

let newConfigurations = configurations.slice();
let charArray = [];
for (let i = 0; i < configurations.length; i++) {
	let configIndex = Math.floor(Math.random()*newConfigurations.length);
	let configString = newConfigurations[configIndex];
	// remove result from array so it doesn't recurr
	newConfigurations.splice(configIndex, 1);
	let configCharIndex = Math.floor(Math.random()*configString.length);
	let configChar = configString.charAt(configCharIndex).toUpperCase();
	if (configChar === 'Q') {
		configChar = 'Qu';
	}
	charArray.push(configChar);
}

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

  renderSquare(id, char) {
  	let newSelected = this.state.selected.slice();
  	return <Square id={id} value={char} lastClicked={(id) => this.handleLastClicked(id)} isSelected={newSelected[id]}/>;
  }
  
  render() {
    return(
      <div>
      <div className="row">
      	{this.renderSquare(0, charArray[0])}
      	{this.renderSquare(1, charArray[1])}
      	{this.renderSquare(2, charArray[2])}
      	{this.renderSquare(3, charArray[3])}
      	{this.renderSquare(4, charArray[4])}
      </div>
      <div className="row">
      	{this.renderSquare(5, charArray[5])}
      	{this.renderSquare(6, charArray[6])}
      	{this.renderSquare(7, charArray[7])}
      	{this.renderSquare(8, charArray[8])}
      	{this.renderSquare(9, charArray[9])}
      </div>
      <div className="row">
      	{this.renderSquare(10, charArray[10])}
      	{this.renderSquare(11, charArray[11])}
      	{this.renderSquare(12, charArray[12])}
      	{this.renderSquare(13, charArray[13])}
      	{this.renderSquare(14, charArray[14])}
      </div>
      <div className="row">
      	{this.renderSquare(15, charArray[15])}
      	{this.renderSquare(16, charArray[16])}
      	{this.renderSquare(17, charArray[17])}
      	{this.renderSquare(18, charArray[18])}
      	{this.renderSquare(19, charArray[19])}
      </div>
      <div className="row">
      	{this.renderSquare(20, charArray[20])}
      	{this.renderSquare(21, charArray[21])}
      	{this.renderSquare(22, charArray[22])}
      	{this.renderSquare(23, charArray[23])}
      	{this.renderSquare(24, charArray[24])}
      </div>
      </div>
    )
  }
}

export default Board;