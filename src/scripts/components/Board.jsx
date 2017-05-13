import React 	from 'react';

import Square from './Square.jsx';
import Submit from './Submit.jsx';

// ----- GENERATE GAME BOARD TILE VALUES -----

const numRows = 5;
const numTiles = 5;
const configurations = [
	'aaafrs',
	'aaeeee',
	'aafirs',
	'adennn',
	'aeeeem',
	'aeegmu',
	'aegmnn',
	'afirsy',
	'bjkqxz',
	'ccenst',
	'ceiilt',
	'ceilpt',
	'ceipst',
	'ddhnot',
	'dhhlor',
	'dhlnor',
	'dhlnor',
	'eiiitt',
	'emottt',
	'ensssu',
	'fiprsy',
	'gorrvw',
	'iprrry',
	'nootuw',
	'ooottu'
];

let charArray = getTileValues();

// Outputs a matrix charArray, each element corresponds to an alphabetical character, each char represents the result of a random dice role based on the configurations provided for the dies.
// charArray is of the form (values are randomized in reality):
// [
//   ['a', 'b', 'c', 'd', 'e'],
//   ['f', 'g', 'h', 'i', 'j'],
//   ['k', 'l', 'm', 'n', 'o'],
//   ['p', 'q', 'r', 's', 't'],
//   ['u', 'v', 'w', 'x', 'y']
// ]
function getTileValues() {
	let newConfigurations = configurations.slice();
	let charArray = [];
	for (let i = 0; i < numRows; i++) {
		let rowArray = [];
		for (let j = 0; j < numTiles; j++) {
			let configIndex = Math.floor(Math.random()*newConfigurations.length);
			let configString = newConfigurations[configIndex];
			// remove result from array so it doesn't recurr
			newConfigurations.splice(configIndex, 1);
			let configCharIndex = Math.floor(Math.random()*configString.length);
			let configChar = configString.charAt(configCharIndex);
			if (configChar === 'q') {
			configChar = 'qu';
			}
			rowArray.push(configChar);
		}
		charArray.push(rowArray);
	}
	return charArray;
}


class Board extends React.Component {

	constructor() {
		super();
		this.state = {
			lastClicked: null,
			selected: [
    	[false, false, false, false, false],
    	[false, false, false, false, false],
    	[false, false, false, false, false],
    	[false, false, false, false, false],
    	[false, false, false, false, false]
    ],
			history: [],
			currentWord: ''
		}
	}

	handleLastClicked(key, value) {
		// can't assign directly into elements of an object in setState,
		// i.e. this.setState({selected[id]: true}) doesn't work.
		let newSelected = this.state.selected.slice();
		const prevKey = this.state.lastClicked;
		// if this isn't the first tile of the game (lastClicked is null for the first tile)
		if (prevKey) {
			const i = Number(key.charAt(0));
			const j = Number(key.charAt(1));
			// checks if the clicked tile is adjacent to the last clicked tile
			if (this.isAdjacent(Number(key.charAt(0)), Number(key.charAt(1)))) {
				// if tile is not selected, select it and update lastClicked
				if (!(newSelected[i][j])) {
					this.addTile(key, value, newSelected);
				} 
				// if tile is selected AND it was the last clicked tile,
				// deselect it and update lastClicked to have its previous value
			} else if (newSelected[i][j] && (key === this.state.lastClicked)) {
					this.removeTile(key, value, newSelected);
			}
		} else {
			this.addTile(key, value, newSelected);
		}
	}

	isAdjacent(nextI, nextJ) {
		const prevKey = this.state.lastClicked;
		const i = Number(prevKey.charAt(0));
		const j = Number(prevKey.charAt(1));
		// get all adjacent indices, whether they exist or not
	  const adjIndices = [
	    [i - 1, j - 1],
	    [i - 1, j],
	    [i - 1, j + 1],
	    [i, j - 1],
	    [i, j + 1],
	    [i + 1, j -1],
	    [i + 1, j],
	    [i + 1, j + 1]
	    ];
	    
	  // Arrays, like all non-primitive types in, are checked by reference, not by value. Whenever you create a new instance of an object (like an array), the variable is actually a pointer to a location in memory where the object resides.
	  // For this reason, indexOf won't work because you're comparing pointers to two different arrays.
	  // You have to compare the values manually
	  for (let k = 0; k < adjIndices.length; k++) {
	    if (adjIndices[k][0] === nextI && adjIndices[k][1] === nextJ) {
	      return true;
	    }
	  }
	  return false;
	}

	addTile(key, value, newSelected) {
		const i = Number(key.charAt(0));
		const j = Number(key.charAt(1));
		newSelected[i][j] = true;
		this.setState((prevState, props) => {
			prevState.history.push(key);
			prevState.currentWord += value;
			return {
				lastClicked: key,
				selected: newSelected,
				history: prevState.history,
				currentWord: prevState.currentWord
			};
		}, () => this.props.currentWord(this.state.currentWord));
	}

	removeTile(key, value, newSelected) {
		const i = Number(key.charAt(0));
		const j = Number(key.charAt(1));
		newSelected[i][j] = false;
		this.setState((prevState, props) => {
			prevState.history.pop();
			// remove last char (or chars, if a Qu) in word
			if (value.toLowerCase() === "qu") {
				prevState.currentWord = prevState.currentWord
					.slice(0, prevState.currentWord.length - 2);
			} else {
				prevState.currentWord = prevState.currentWord
					.slice(0, prevState.currentWord.length - 1);
			}
			const lastLastClicked = prevState
				.history[prevState.history.length -1];
			return {
				lastClicked: lastLastClicked,
				selected: newSelected,
				history: prevState.history,
				currentWord: prevState.currentWord
			};
		}, () => this.props.currentWord(this.state.currentWord));
	}

  handleSubmit() {
    const word = this.state.currentWord;
    // checks if the current word is a valid word in the Merriam-Webster dictionary.
    // http://dictionaryapi.com/products/api-collegiate-dictionary.htm
    // The window.fetch method is a new browser web API method to replace XmlHttpRequest API.
    // use arrow functions so this still points to the <Board /> component
		fetch('http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + word + '?key=9aa544f7-f7ce-4d87-a5a3-2a7695f6397f', {
				method: 'get'
			}).then((response) => {
				response.text().then((value) => {
					console.log(value);
					if (value.includes('id="' + word)) {
						console.log('is in dictionary');
			    	const newSelected = [
		    		[false, false, false, false, false],
		    		[false, false, false, false, false],
		    		[false, false, false, false, false],
		    		[false, false, false, false, false],
		    		[false, false, false, false, false]
		    	];
			    this.setState({
			    	selected: newSelected,
			    	currentWord: '',
			    	lastClicked: null,
			    	history: []});
			    this.props.handleSubmit();
					} else {
    				alert(this.state.currentWord.toUpperCase() + ' is not a word!');
  				}
				});
			}).catch((err) => {
				console.error('Failed to fetch XML object from dictionary API.');
			});
  }

  // key is a two-digit string representing the coordinates of the square on the board. Ex: id = "42" means the tile located in the 4th row, 2nd column (indexed from 0).
  renderSquare(key, char) {
  	const newSelected = this.state.selected.slice();
  	const i = Number(key.charAt(0));
  	const j = Number(key.charAt(1));
  	return (
  		// to generate JSX in a loop, each element must have a unique key
  		<Square 
	  		key={key}
	  		id = {key}
	  		value={char}
	  		lastClicked={(key, char) => this.handleLastClicked(key, char)}
	  		isSelected={newSelected[i][j]}/>
		);
 }
  
  render() {
    let rows = [];
    for (let i = 0; i < numRows; i++) {
    	let tiles = [];
    	for (let j = 0; j < numTiles; j++) {
  			tiles.push(
  				this.renderSquare(i.toString() + j.toString(), charArray[i][j])
				);
  		}
  		// to generate JSX in a loop, each element must have a unique key
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