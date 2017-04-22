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
	let configChar = configString.charAt(configCharIndex);
	if (configChar === 'q') {
		configChar = 'qu';
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
      <div ref="wrapper">
      {
      	for (let i = 0; i < configurations.length; i++) {
      		if ( i % 5 === 0) {
      			//make a new row
      			let newRow = document.createElement("div");
      			this.refs.wrapper.appendChild(newRow);
      		}

      		newRow.appendChild(this.renderSquare(i, charArray[i]));
      	}
     	}
      </div>
    )
  }
}

export default Board;