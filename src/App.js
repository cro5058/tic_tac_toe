// This will allow your components to remember state
import { useState } from 'react';

/* 
Individual square in the board that can change
its look depending on if the user clicks it
*/
function Square() {
  // This will allow the Square to remember it was clicked
  const [value, setValue] = useState(null);

  // This is an event handler for the button
  function handleClick() {
    setValue("X");
  }

  return <button className="square" onClick={handleClick}>{value}</button>;
}

/*
Tic-tac-toe board component,
made of individual squares that change when the user clicks
  - export - makes the function visible outside the file
  - default - specifies the main function in the file
*/
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
      <div className="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
      <div className="board-row">
        <Square  />
        <Square  />
        <Square  />
      </div>
    </>
  );
}
