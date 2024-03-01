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
import { useRef, useState } from "react";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

// const pieces: Piece[] = [];

const initialBoardState: Piece[] = [];

// Pawns

for (let i = 0; i < 8; i++) {
  initialBoardState.push({ image: blackPawn, x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({ image: whitePawn, x: i, y: 1 });
}

// Rooks

initialBoardState.push({ image: blackRook, x: 0, y: 7 });
initialBoardState.push({ image: blackRook, x: 7, y: 7 });

initialBoardState.push({ image: whiteRook, x: 0, y: 0 });
initialBoardState.push({ image: whiteRook, x: 7, y: 0 });

// Knights

initialBoardState.push({ image: blackKnight, x: 1, y: 7 });
initialBoardState.push({ image: blackKnight, x: 6, y: 7 });

initialBoardState.push({ image: whiteKnight, x: 1, y: 0 });
initialBoardState.push({ image: whiteKnight, x: 6, y: 0 });

// Bishops

initialBoardState.push({ image: blackBishop, x: 2, y: 7 });
initialBoardState.push({ image: blackBishop, x: 5, y: 7 });

initialBoardState.push({ image: whiteBishop, x: 2, y: 0 });
initialBoardState.push({ image: whiteBishop, x: 5, y: 0 });

// Queen

initialBoardState.push({ image: blackQueen, x: 3, y: 7 });
initialBoardState.push({ image: whiteQueen, x: 3, y: 0 });

// King

initialBoardState.push({ image: blackKing, x: 4, y: 7 });
initialBoardState.push({ image: whiteKing, x: 4, y: 0 });

// ----------------------------------------------------------------

const Chessboard = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  const board = [];

  const chessboardRef = useRef<HTMLDivElement>(null);

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
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const minMouseX = chessboard.offsetLeft - 25;
      const minMouseY = chessboard.offsetTop - 25;
      const maxMouseX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxMouseY = chessboard.offsetTop + chessboard.clientHeight - 85;

      const mouseX = e.clientX - 50;
      const mouseY = e.clientY - 50;

      activePiece.style.position = "absolute";

      // Defining the limits to stay within the board

      if (mouseX < minMouseX) {
        activePiece.style.left = `${minMouseX}px`;
      } else if (mouseX > maxMouseX) {
        activePiece.style.left = `${maxMouseX}px`;
      } else {
        activePiece.style.left = `${mouseX}px`;
      }

      if (mouseY < minMouseY) {
        activePiece.style.top = `${minMouseY}px`;
      } else if (mouseY > maxMouseY) {
        activePiece.style.top = `${maxMouseY}px`;
      } else {
        activePiece.style.top = `${mouseY}px`;
      }
    }
  };

  const dropPiece = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.target);

    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.floor((e.clientY - chessboard.offsetTop) / 100);
      console.log(x, y);

      setPieces((value) => {
        const piece = value.map((p) => {
          if (p.x === 1 && p.y === 0) {
            p.x = 0;
          }
          return p;
        });
        return piece;
      });

      pieces[0].x = 5;
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
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};

export default Chessboard;
