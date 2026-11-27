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
made of individual squares that change when the user clicks
  - export - makes the function visible outside the file
  - default - specifies the main function in the file
*/
export default function Board() {
  // Allow the game to take turns (start with "X")
  const [xIsNext, setXIsNext] = useState(true);
  
  // Lift the state of the board up into the parent
  // (create an array with 9 elems, set each to null)
  const [squares, setSquares] = useState(Array(9).fill(null));

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
    setSquares(nextSquares);

    // Change whose turn it is
    setXIsNext(!xIsNext);
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
