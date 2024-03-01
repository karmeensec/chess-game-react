import "./Chessboard.css";
import Tile from "../Tile/Tile";
import blackPawn from "../../assets/images/pawn (1).png";
import whitePawn from "../../assets/images/pawn.png";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let i = 0; i < 8; i++) {
  pieces.push({ image: blackPawn, x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ image: whitePawn, x: i, y: 1 });
}

const Chessboard = () => {
  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const startZero = 2;
      const number = i + j + startZero;

      let image = undefined;

      pieces.forEach((piece) => {
        if (piece.x === i && piece.y === j) {
          image = piece.image;
        }
      });

      board.push(<Tile number={number} image={image} />);
    }
  }

  return <div id="chessboard"> {board} </div>;
};

export default Chessboard;
