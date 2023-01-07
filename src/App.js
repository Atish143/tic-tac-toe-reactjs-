import React, { useState } from "react";

function TicTacToe() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function handleClick(index) {
    if (board[index] !== "" || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = getWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  }

  function renderSquare(index) {
    return (
      <button
        style={{
          width: "100px",
          height: "100px",
          fontSize: "48px",
          textAlign: "center",
          border: "1px solid black",
        }}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  }

  function renderRow(startIndex) {
    return (
      <div style={{ display: "flex" }}>
        {renderSquare(startIndex)}
        {renderSquare(startIndex + 1)}
        {renderSquare(startIndex + 2)}
      </div>
    );
  }

  function renderBoard() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "300px",
          height: "300px",
          border: "1px solid black",
        }}
      >
        {renderRow(0)}
        {renderRow(3)}
        {renderRow(6)}
      </div>
    );
  }

  function renderStatus() {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (!board.includes("")) {
      return "Tie game!";
    } else {
      return `Next player: ${isXNext ? "X" : "O"}`;
    }
  }

  function getWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {renderBoard()}
      <div style={{ marginTop: "20px", fontSize: "24px" }}>
        {renderStatus()}
      </div>
    </div>
  );
}

export default TicTacToe;
