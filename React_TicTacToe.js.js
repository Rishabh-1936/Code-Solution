import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square(props){
  return(
    <div className="square" style={squareStyle} onClick={props.onClick}>
      {props.value}
    </div>
  );
}

class Board extends React.Component {

constructor(props){
  super(props);
  this.state = this.vanillaState();
  } 

   vanillaState(){
    return{
      squares: Array(9).fill(null),
      xIsNext: true,
    };
   };

reset(){
  this.setState(this.vanillaState());
}

handleClick(i){
  const squares = this.state.squares.slice();

  if(calculateWinner(squares) || squares[i]){
    return;
  }

  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    squares:squares,
    xIsNext: !(this.state.xIsNext),
    });
}

  renderSquare(i){
    return( 
      <Square 
          value={this.state.squares[i]} 
          onClick={() => this.handleClick(i)}
        />
      );
    }
  render() {

    const winnerStat = calculateWinner(this.state.squares);
    let status = 'Next player: X';
    let winner = 'Winner: None';
    if(winnerStat){
      winner = 'Winner: ' + winnerStat;
      // status = 'Winner: ' + winner;
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O' ) ;
    }
    else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O' ) ;
    }


    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>{status}</div>
        <div className="winner" style={instructionsStyle}>{winner}</div>
        <button style={buttonStyle} onClick={() => {this.reset()} }>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row" style={rowStyle}>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row" style={rowStyle}>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i =0;i<lines.length ;++i){
    const [a,b,c] =lines[i];
    if(squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c]) ){
      return squares[a];
    }
  }
  return null;
}






















