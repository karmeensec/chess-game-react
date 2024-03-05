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
import {
  Piece,
  PieceType,
  Position,
  TeamType,
  HORIZONTAL_AXIS,
  initialBoardState,
  teamTypes,
  VERTICAL_AXIS,
  GRID_SIZE,
  samePosition,
} from "../../constants.ts";

// Pawns

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: blackPawn,
    position: {
      x: i,
      y: 6,
    },

    type: PieceType.PAWN,
    team: teamTypes[i % 2],
  });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: whitePawn,
    position: {
      x: i,
      y: 1,
    },

    type: PieceType.PAWN,
    team: teamTypes[i % 2],
  });
}

// Rooks

initialBoardState.push({
  image: blackRook,
  position: {
    x: 0,
    y: 7,
  },

  type: PieceType.ROOK,
  team: teamTypes[0],
});
initialBoardState.push({
  image: blackRook,
  position: {
    x: 7,
    y: 7,
  },

  type: PieceType.ROOK,
  team: teamTypes[0],
});

initialBoardState.push({
  image: whiteRook,
  position: {
    x: 0,
    y: 0,
  },

  type: PieceType.ROOK,
  team: teamTypes[1],
});
initialBoardState.push({
  image: whiteRook,
  position: {
    x: 7,
    y: 0,
  },

  type: PieceType.ROOK,
  team: teamTypes[1],
});

// Knights

initialBoardState.push({
  image: blackKnight,
  position: {
    x: 1,
    y: 7,
  },

  type: PieceType.KNIGHT,
  team: teamTypes[0],
});
initialBoardState.push({
  image: blackKnight,
  position: {
    x: 6,
    y: 7,
  },

  type: PieceType.KNIGHT,
  team: teamTypes[0],
});

initialBoardState.push({
  image: whiteKnight,
  position: {
    x: 1,
    y: 0,
  },

  type: PieceType.KNIGHT,
  team: teamTypes[1],
});
initialBoardState.push({
  image: whiteKnight,
  position: {
    x: 6,
    y: 0,
  },

  type: PieceType.KNIGHT,
  team: teamTypes[1],
});

// Bishops

initialBoardState.push({
  image: blackBishop,
  position: {
    x: 2,
    y: 7,
  },

  type: PieceType.BISHOP,
  team: teamTypes[0],
});
initialBoardState.push({
  image: blackBishop,
  position: {
    x: 5,
    y: 7,
  },

  type: PieceType.BISHOP,
  team: teamTypes[0],
});

initialBoardState.push({
  image: whiteBishop,
  position: {
    x: 2,
    y: 0,
  },

  type: PieceType.BISHOP,
  team: teamTypes[1],
});
initialBoardState.push({
  image: whiteBishop,
  position: {
    x: 5,
    y: 0,
  },

  type: PieceType.BISHOP,
  team: teamTypes[1],
});

// Queen

initialBoardState.push({
  image: blackQueen,
  position: {
    x: 3,
    y: 7,
  },

  type: PieceType.QUEEN,
  team: teamTypes[0],
});
initialBoardState.push({
  image: whiteQueen,
  position: {
    x: 3,
    y: 0,
  },

  type: PieceType.QUEEN,
  team: teamTypes[1],
});

// King

initialBoardState.push({
  image: blackKing,
  position: {
    x: 4,
    y: 7,
  },

  type: PieceType.KING,
  team: teamTypes[0],
});
initialBoardState.push({
  image: whiteKing,
  position: {
    x: 4,
    y: 0,
  },

  type: PieceType.KING,
  team: teamTypes[1],
});

// ----------------------------------------------------------------

const Chessboard = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });

  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

  const board = [];

  const chessboardRef = useRef<HTMLDivElement>(null);

  const referee = new Referee();

  const grabPiece = (e: React.MouseEvent) => {
    const element = e.target as HTMLDivElement;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      setGrabPosition({ x: grabX, y: grabY });

      const mouseX = e.clientX - GRID_SIZE / 2;
      const mouseY = e.clientY - GRID_SIZE / 2;

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
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const enPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.MY ? 1 : -1;

        if (enPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant === false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant === false;
              }

              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        }

        if (validMove) {
          // Update the piece position

          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              console.log("Grabbed piece", piece);

              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceType.PAWN;

              piece.position.x = x;
              piece.position.y = y;

              const promotionRow = piece.team === TeamType.MY ? 7 : 0;

              if (y === promotionRow) {
                console.log("Up for promotion row");
              }

              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              console.log("Not Grabbed piece", piece);

              if (piece.type === PieceType.PAWN) {
                piece.enPassant === false;
              }

              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }

      setActivePiece(null);
    }
  };

  const promotePawn = () => {
    console.log("Promotion Pawn");
  };

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const startZero = 2;
      const number = i + j + startZero;

      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );

      const image = piece ? piece.image : "";

      const key = `${i}-${j}`;

      board.push(<Tile number={number} image={image} key={key} />);
    }
  }

  return (
    <>
      <div id="pawn-promotion-modal">
        <img src={whiteRook} onClick={() => promotePawn()} />
        <img src={whiteKnight} onClick={() => promotePawn()} />
        <img src={whiteBishop} onClick={() => promotePawn()} />
        <img src={whiteQueen} onClick={() => promotePawn()} />
      </div>

      <div
        id="chessboard"
        onMouseDown={(e) => grabPiece(e)}
        onMouseMove={(e) => movePiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        ref={chessboardRef}
      >
        {board}
      </div>
    </>
  );
};

export default Chessboard;
