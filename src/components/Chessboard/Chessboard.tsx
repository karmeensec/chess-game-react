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
import Referee from "../referee/Referee.ts";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
}

export enum PieceType {
  PAWN,
  ROOK,
  BISHOP,
  KNIGHT,
  QUEEN,
  KING,
}

export enum TeamType {
  OPPONENT,
  MY,
}

const initialBoardState: Piece[] = [];

const teamTypes = [TeamType.OPPONENT, TeamType.MY];

// Pawns

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: blackPawn,
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: teamTypes[i % 2],
  });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: whitePawn,
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: teamTypes[i % 2],
  });
}

// Rooks

initialBoardState.push({
  image: blackRook,
  x: 0,
  y: 7,
  type: PieceType.ROOK,
  team: teamTypes[0],
});
initialBoardState.push({
  image: blackRook,
  x: 7,
  y: 7,
  type: PieceType.ROOK,
  team: teamTypes[0],
});

initialBoardState.push({
  image: whiteRook,
  x: 0,
  y: 0,
  type: PieceType.ROOK,
  team: teamTypes[1],
});
initialBoardState.push({
  image: whiteRook,
  x: 7,
  y: 0,
  type: PieceType.ROOK,
  team: teamTypes[1],
});

// Knights

initialBoardState.push({
  image: blackKnight,
  x: 1,
  y: 7,
  type: PieceType.KNIGHT,
  team: teamTypes[0],
});
initialBoardState.push({
  image: blackKnight,
  x: 6,
  y: 7,
  type: PieceType.KNIGHT,
  team: teamTypes[0],
});

initialBoardState.push({
  image: whiteKnight,
  x: 1,
  y: 0,
  type: PieceType.KNIGHT,
  team: teamTypes[1],
});
initialBoardState.push({
  image: whiteKnight,
  x: 6,
  y: 0,
  type: PieceType.KNIGHT,
  team: teamTypes[1],
});

// Bishops

initialBoardState.push({
  image: blackBishop,
  x: 2,
  y: 7,
  type: PieceType.BISHOP,
  team: teamTypes[0],
});
initialBoardState.push({
  image: blackBishop,
  x: 5,
  y: 7,
  type: PieceType.BISHOP,
  team: teamTypes[0],
});

initialBoardState.push({
  image: whiteBishop,
  x: 2,
  y: 0,
  type: PieceType.BISHOP,
  team: teamTypes[1],
});
initialBoardState.push({
  image: whiteBishop,
  x: 5,
  y: 0,
  type: PieceType.BISHOP,
  team: teamTypes[1],
});

// Queen

initialBoardState.push({
  image: blackQueen,
  x: 3,
  y: 7,
  type: PieceType.QUEEN,
  team: teamTypes[0],
});
initialBoardState.push({
  image: whiteQueen,
  x: 3,
  y: 0,
  type: PieceType.QUEEN,
  team: teamTypes[1],
});

// King

initialBoardState.push({
  image: blackKing,
  x: 4,
  y: 7,
  type: PieceType.KING,
  team: teamTypes[0],
});
initialBoardState.push({
  image: whiteKing,
  x: 4,
  y: 0,
  type: PieceType.KING,
  team: teamTypes[1],
});

// ----------------------------------------------------------------

const Chessboard = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

  const board = [];

  const chessboardRef = useRef<HTMLDivElement>(null);

  const referee = new Referee();

  const grabPiece = (e: React.MouseEvent) => {
    const element = e.target as HTMLDivElement;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("chess-piece") && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const gridY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      setGridX(gridX);
      setGridY(gridY);

      const mouseX = e.clientX - 50;
      const mouseY = e.clientY - 50;

      element.style.position = "absolute";

      element.style.left = `${mouseX}px`;
      element.style.top = `${mouseY}px`;

      setActivePiece(element);
    }
  };

  const movePiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const minMouseX = chessboard.offsetLeft - 25;
      const minMouseY = chessboard.offsetTop - 25;
      const maxMouseX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxMouseY = chessboard.offsetTop + chessboard.clientHeight - 75;

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

  const dropPiece = (e: React.MouseEvent) => {
    console.log(e.target);

    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      // Update the piece position

      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            referee.isValidMove(gridX, gridY, x, y, p.type, p.team);

            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });

      // pieces[0].x = 5;
      setActivePiece(null);
    }
  };

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
