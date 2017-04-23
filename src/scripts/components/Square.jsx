import React from 'react';

class Square extends React.Component {

  render() {
    return(
      <div className= {this.props.isSelected ? "tile tile-selected" : "tile"} onClick={() => this.props.lastClicked(this.props.id, this.props.value)}>
      <div>{this.props.value}</div>
      </div>
    )
  }
}

export default Square;