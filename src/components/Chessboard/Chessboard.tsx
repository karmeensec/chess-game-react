import "./Chessboard.css";
import Tile from "../Tile/Tile";
import blackPawn from "../../assets/images/pawn (1).png";
import whitePawn from "../../assets/images/pawn.png";
import blackRook from "../../assets/images/rook (1).png";
import whiteRook from "../../assets/images/rook.png";
import blackKnight from "../../assets/images/knight (1).png";
import whiteKnight from "../../assets/images/knight.png";
import blackBishop from "../../assets/images/bishop (1).png";
import whiteBishop from "../../assets/images/bishop.png";
import blackQueen from "../../assets/images/queen (1).png";
import whiteQueen from "../../assets/images/queen.png";
import blackKing from "../../assets/images/king (1).png";
import whiteKing from "../../assets/images/king.png";
import { useRef } from "react";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

// Pawns

for (let i = 0; i < 8; i++) {
  pieces.push({ image: blackPawn, x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ image: whitePawn, x: i, y: 1 });
}

// Rooks

pieces.push({ image: blackRook, x: 0, y: 7 });
pieces.push({ image: blackRook, x: 7, y: 7 });

pieces.push({ image: whiteRook, x: 0, y: 0 });
pieces.push({ image: whiteRook, x: 7, y: 0 });

// Knights

pieces.push({ image: blackKnight, x: 1, y: 7 });
pieces.push({ image: blackKnight, x: 6, y: 7 });

pieces.push({ image: whiteKnight, x: 1, y: 0 });
pieces.push({ image: whiteKnight, x: 6, y: 0 });

// Bishops

pieces.push({ image: blackBishop, x: 2, y: 7 });
pieces.push({ image: blackBishop, x: 5, y: 7 });

pieces.push({ image: whiteBishop, x: 2, y: 0 });
pieces.push({ image: whiteBishop, x: 5, y: 0 });

// Queen

pieces.push({ image: blackQueen, x: 3, y: 7 });
pieces.push({ image: whiteQueen, x: 3, y: 0 });

// King

pieces.push({ image: blackKing, x: 4, y: 7 });
pieces.push({ image: whiteKing, x: 4, y: 0 });

// ----------------------------------------------------------------

const Chessboard = () => {
  const board = [];

  const chessboardRef = useRef(null);

  let activePiece: HTMLElement | null = null;

  const grabPiece = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement;

    if (element.classList.contains("chess-piece")) {
      const mouseX = e.clientX - 50;
      const mouseY = e.clientY - 50;

      element.style.position = "absolute";

      element.style.left = `${mouseX}px`;
      element.style.top = `${mouseY}px`;

      activePiece = element;
    }
  };

  const movePiece = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activePiece) {
      const mouseX = e.clientX - 50;
      const mouseY = e.clientY - 50;

      activePiece.style.position = "absolute";

      activePiece.style.left = `${mouseX}px`;
      activePiece.style.top = `${mouseY}px`;
    }
  };

  const dropPiece = () => {
    if (activePiece) {
      activePiece = null;
    }
  };

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const startZero = 2;
      const number = i + j + startZero;

      let image = "";

      pieces.forEach((piece) => {
        if (piece.x === i && piece.y === j) {
          image = piece.image;
        }
      });

      const key = `${i}-${j}`;

      board.push(<Tile number={number} image={image} key={key} />);
    }
  }

  return (
    <div
      id="chessboard"
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={() => dropPiece()}
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};

export default Chessboard;
