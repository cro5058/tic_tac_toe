// This will allow your components to remember state
import { useState } from 'react';

/* 
Individual square in the board that can change
its look depending on if the user clicks it
*/
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/*
Tic-tac-toe board component,
made of individual squares that change when the user clicks.
- Controlled by the Game component
*/
function Board({ xIsNext, squares, onPlay }) {
  // Put an X at the ith index of the tic tac toe array
  function handleClick(i) {
    // Return early if the square is occupied or the game is over
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Create a copy of the squares array (auto start at index 0)
    const nextSquares = squares.slice();

    // Add X or O to the ith square in the new array
    nextSquares[i] = (xIsNext) ? "X" : "O";

    // Replace the exg squares array with the new array
    // This will trigger a re-render of elems that use squares state
    // i.e. the Board and its child components
    onPlay(nextSquares);
  }

  // At the end, display if there is a winner,
  // or else, show whose turn it is
  const winner = calculateWinner(squares);
  let status = (winner) ? ("Winner: " + winner) : ("Next player: " + (xIsNext ? "X" : "O"));

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


/*
Game component, stores the board and the history of moves 
  - export - makes the function visible outside the file
  - default - specifies the main function in the file
*/
export default function Game() {
  // History of the board, list of arrays
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // Current move number
  const [currentMove, setCurrentMove] = useState(0);

  // Allow the game to take turns (start with "X")
  const xIsNext = currentMove % 2 === 0;

  // Current arrangement of the board
  const currentSquares = history[currentMove];

  // Function that will be called by the Board component to update the game
  function handlePlay(nextSquares) {
    // Update the history (all items in history plus the new state)
    // Take into account whether the user went back in time to a previous move
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  // Function to allow the user to restore a past state of the board
  function jumpTo(nextMove) {
    // Set the current move to the specified move
    setCurrentMove(nextMove);
  }

  // Function to enumerate buttons of different states of the board
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } 
    else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


/*
Determines whether the game has been won and if so, who is the winner.
*/
function calculateWinner(squares) {
  // Horizontal, vertical, and diagonal ways you can win
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  // See if any of these combinations of indices have the same character
  // at each index in the board
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
