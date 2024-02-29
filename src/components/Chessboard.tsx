import React from "react";
import "./Chessboard.css";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

const Chessboard = () => {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      board.push(
        <div className="tile">
          {" "}
          {horizontalAxis[i]} {verticalAxis[j]}{" "}
        </div>
      );
    }
  }

  return <div id="chessboard"> {board} </div>;
};

export default Chessboard;
