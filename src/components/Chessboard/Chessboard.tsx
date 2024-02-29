import "./Chessboard.css";
import Tile from "../Tile/Tile";
import king from "../../assets/images/king.png";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

const Chessboard = () => {
  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const startZero = 2;
      const number = i + j + startZero;

      board.push(<Tile number={number} image={king} />);
    }
  }

  return <div id="chessboard"> {board} </div>;
};

export default Chessboard;
