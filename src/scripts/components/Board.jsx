import React 	from 'react';

import Square from './Square.jsx';
import Submit from './Submit.jsx';

const configurations = ['aaafrs', 'aaeeee', 'aafirs', 'adennn',
 'aeeeem', 'aeegmu', 'aegmnn', 'afirsy', 'bjkqxz', 'ccenst',
 'ceiilt', 'ceilpt', 'ceipst', 'ddhnot', 'dhhlor', 'dhlnor',
 'dhlnor', 'eiiitt', 'emottt', 'ensssu', 'fiprsy', 'gorrvw',
 'iprrry', 'nootuw', 'ooottu'];

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
			selected: Array.apply(null, Array(25))
				.map(Boolean.prototype.valueOf, false),
			history: [],
			currentWord: ''
		}
	}

	handleLastClicked(id, value) {
		// can't assign directly into elements of an object in setState,
		// i.e. this.setState({selected[id]: true}) doesn't work.
		let newSelected = this.state.selected.slice();
		const prevId = this.state.lastClicked;
		let adjTileIds;
		// 0 is falsy
		if (prevId || prevId === 0) {
			let edgeTiles = [1, 2, 3, 5, 10, 15, 9, 14, 19, 21, 22, 23];
			let cornerTiles = [0, 4, 20, 24];
			// is it an edge tile? (id = 1-3, 5, 10, 15, 9, 14, 19, 21-23)
			if (edgeTiles.indexOf(prevId) !== -1) {
				adjTileIds = this.getAdjacentTiles(edgeTiles, prevId);
			// is it a corner tile? (id = 0, 4, 20, 24)
			} else if (cornerTiles.indexOf(prevId) !== -1) {
				adjTileIds = this.getAdjacentTiles(cornerTiles, prevId);
			// else it's in the middle:
			} else {
				adjTileIds = [prevId, prevId-6, prevId-5, prevId-4,
				prevId-1, prevId+1, prevId+4, prevId+5, prevId+6];
			}
			console.log(adjTileIds);
			// if the clicked tile is adjacent to the last clicked tile:
			if (adjTileIds.indexOf(id) !== -1) {
				// if tile is not selected, select it and update lastClickedId
				if (!(newSelected[id])) {
					this.addTile(id, value, newSelected);
				// if tile is selected AND it was the last clicked tile,
				// deselect it and update lastClicked to have its previous value
				} else if (id === this.state.lastClicked) {
					this.removeTile(id, value, newSelected);
				}
			}
		} else {
			this.addTile(id, value, newSelected);
		}
	}

	getAdjacentTiles(tiles, prevId) {
		switch (prevId) {
			case 0:
				return [0, 1, 5, 6];
				break;
			case 1:
				return [1, 0, 5, 6, 7, 2];
				break;
			case 2:
				return [2, 1, 6, 7, 8, 3];
				break;
			case 3:
				return [3, 2, 7, 8, 9, 4];
				break;
			case 4:
				return [4, 3, 9, 8];
				break;
			case 5:
				return [5, 0, 1, 6, 11, 10];
				break;
			case 9:
				return [9, 4, 3, 8, 13, 14];
				break;
			case 10:
				return [10, 5, 6, 11, 16, 15];
				break;
			case 14:
				return [14, 9, 8, 13, 18, 19];
				break;
			case 15:
				return [15, 10, 11, 16, 20, 21];
				break;
			case 19:
				return [19, 14, 13, 18, 23, 24];
				break;
			case 20:
				return [20, 15, 16, 21];
				break;
			case 21:
				return [21, 20, 15, 16, 17, 22];
				break;
			case 22:
				return [22, 21, 16, 17, 18, 23];
				break;
			case 23:
				return [23, 22, 17, 18, 19, 24];
				break;
			case 24:
				return [24, 18, 19, 23];
				break;
			default:
				return [prevId, prevId-6, prevId-5, prevId-4,
				prevId-1, prevId+1, prevId+4, prevId+5, prevId+6];
				break;
		}
	}

	addTile(id, value, newSelected) {
		newSelected[id] = true;
		this.setState((prevState, props) => {
			prevState.history.push(id);
			prevState.currentWord += value;
			return {
				lastClicked: id,
				selected: newSelected,
				history: prevState.history,
				currentWord: prevState.currentWord
			};
		}, () => this.props.currentWord(this.state.currentWord));
	}

	removeTile(id, value, newSelected) {
		newSelected[id] = false;
		this.setState((prevState, props) => {
			prevState.history.pop();
			// remove last char (or chars, if a Q) in word
			if (value.toLowerCase() === "qu") {
				prevState.currentWord = prevState.currentWord
					.slice(0, prevState.currentWord.length - 2);
			} else {
				prevState.currentWord = prevState.currentWord
					.slice(0, prevState.currentWord.length - 1);
			}
			let lastLastClicked = prevState
				.history[prevState.history.length -1];
			return {
				lastClicked: lastLastClicked ,
				selected: newSelected,
				history: prevState.history,
				currentWord: prevState.currentWord};
		}, () => this.props.currentWord(this.state.currentWord));
	}

  handleSubmit() {
    let newSelected = Array.apply(null, Array(25))
    	.map(Boolean.prototype.valueOf, false);
    this.setState({
    	selected: newSelected,
    	currentWord: '',
    	lastClicked: null,
    	history: []});
    this.props.handleSubmit();
  }

  renderSquare(id, char) {
  	let newSelected = this.state.selected.slice();
  	return (
  		<Square 
	  		key={id}
	  		id={id}
	  		value={char}
	  		lastClicked={(id, char) => this.handleLastClicked(id, char)}
	  		isSelected={newSelected[id]}/>
		);
 }
  
  render() {
    let numRows = 5;
    let numTiles = 5;
    let rows = [];
    let counter = 0;

    for (let i = 0; i < numRows; i++) {
    	let tiles = [];

    	for (let j = 0; j < numTiles; j++) {
  			tiles.push(
  				this.renderSquare(counter, charArray[counter])
				);
				counter++;
  		}

    	rows.push(
    		<div key={i} className="row">
    			{tiles}
    		</div>
  		);
  	}

    return (
      <div>
        <div className="blue-area">
          <div ref="wrapper">
			      {rows}
		      </div>
        </div>
        <div className="word-area">
          <div className="current-header">Current Word</div>
          <div className="current-word">{this.state.currentWord}</div>
        </div>
        <Submit 
        	handleSubmit={this.handleSubmit.bind(this)}
        	isDisabled={this.state.currentWord.length < 3 ? true : false}/>
      </div>

    );
  }
}

export default Board;