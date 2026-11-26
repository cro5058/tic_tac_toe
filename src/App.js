/* 
Individual square in the board that can change
its look depending on if the user clicks it
*/
function Square({ value }) {
  return <button className="square">{value}</button>;
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
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
