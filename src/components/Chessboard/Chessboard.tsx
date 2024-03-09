import "./Chessboard.css";
import Tile from "../Tile/Tile";

import { FunctionComponent, useRef, useState } from "react";
import { HORIZONTAL_AXIS, VERTICAL_AXIS, GRID_SIZE } from "../../constants.ts";
import { Piece, Position } from "../../models";

interface ChessboardProps {
  playMove: (piece: Piece, position: Position) => boolean;
  pieces: Piece[];
}

const Chessboard: FunctionComponent<ChessboardProps> = ({
  playMove,
  pieces,
}) => {
  const [grabPosition, setGrabPosition] = useState<Position>(
    new Position(-1, -1)
  );

  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

  const board = [];

  const chessboardRef = useRef<HTMLDivElement>(null);

  const grabPiece = (e: React.MouseEvent) => {
    const element = e.target as HTMLDivElement;
    const chessboard = chessboardRef.current;

    if (element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      setGrabPosition(new Position(grabX, grabY));

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
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) => p.samePosition(grabPosition));

      if (currentPiece) {
        const success = playMove(currentPiece.clone(), new Position(x, y));

        if (!success) {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }

      setActivePiece(null);
    }
  };

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const startZero = 2;
      const number = i + j + startZero;

      const piece = pieces.find((p) => p.samePosition(new Position(i, j)));

      const image = piece ? piece.image : "";

      const key = `${i}-${j}`;

      const currentPiece =
        activePiece !== null
          ? pieces.find((p) => p.samePosition(grabPosition))
          : undefined;

      const highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) =>
            p.samePosition(new Position(i, j))
          )
        : false;

      board.push(
        <Tile number={number} image={image} key={key} highlight={highlight} />
      );
    }
  }

  return (
    <>
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
