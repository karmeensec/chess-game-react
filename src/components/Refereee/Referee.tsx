import Chessboard from "../Chessboard/Chessboard";
import { initialBoard } from "../../constants";
import { useEffect, useRef, useState } from "react";
import {
  pawnMovement,
  knightMovement,
  bishopMovement,
  rookMovement,
  queenMovement,
  kingMovement,
} from "../referee/rules";

import { Piece, Position } from "../../models";
import { PieceType, TeamType } from "../../types";
import { Pawn } from "../../models/Pawn";
import { Board } from "../../models/Board";

const Referee = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updatePossibleMoves();
  }, []);

  const updatePossibleMoves = (): void => {
    board.calculateAllMoves();
  };

  const playMove = (playedPiece: Piece, destination: Position): boolean => {
    let playedMoveIsValid = false;

    const validMove = isValidMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    setBoard((prev) => {
      playedMoveIsValid = board.playMove(
        enPassantMove,
        destination,
        playedPiece,
        validMove
      );

      const boardClone = board.clone();

      return boardClone;
    });

    const promotionRow = playedPiece.team === TeamType.MY ? 7 : 0;

    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn(playedPiece);
    }

    return playedMoveIsValid;
  };

  const isValidMove = (
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ): boolean => {
    let validMove = false;

    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMovement(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;

      case PieceType.KNIGHT:
        validMove = knightMovement(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;

      case PieceType.BISHOP:
        validMove = bishopMovement(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;

      case PieceType.ROOK:
        validMove = rookMovement(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;

      case PieceType.QUEEN:
        validMove = queenMovement(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;

      case PieceType.KING:
        validMove = kingMovement(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
    }

    return validMove;
  };

  const isEnPassantMove = (
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ): boolean => {
    const pawnDirection = team === TeamType.MY ? 1 : -1;

    if (type === PieceType.PAWN) {
      // Pawn Attacking
      if (
        desiredPosition.x - initialPosition.x === -1 ||
        (desiredPosition.x - initialPosition.x === 1 &&
          desiredPosition.y - initialPosition.y === pawnDirection)
      ) {
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        );

        if (piece) {
          return true;
        }
      }
    }

    return false;
  };

  const promotePawn = (pieceType: PieceType) => {
    if (promotionPawn === undefined) {
      return;
    }

    board.pieces = board.pieces.reduce((results, piece) => {
      if (piece.samePiecePosition(promotionPawn)) {
        piece.type = pieceType;
        const teamType = piece.team === TeamType.MY ? "w" : "b";
        let promotedImage = "";

        switch (pieceType) {
          case PieceType.ROOK:
            promotedImage = "rook";
            break;
          case PieceType.KNIGHT:
            promotedImage = "knight";
            break;
          case PieceType.BISHOP:
            promotedImage = "bishop";
            break;
          case PieceType.QUEEN:
            promotedImage = "queen";
            break;
          default:
            break;
        }

        piece.image = `/src/assets/images/${promotedImage}_${teamType}.png`;
      }
      results.push(piece);
      return results;
    }, [] as Piece[]);

    updatePossibleMoves();
    modalRef.current?.classList.add("hidden");
  };

  const promotionTeamType = () => {
    const promotedTeam = promotionPawn?.team === TeamType.MY ? "w" : "b";

    return promotedTeam;
  };

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`src/assets/images/rook_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`src/assets/images/bishop_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`src/assets/images/knight_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`src/assets/images/queen_${promotionTeamType()}.png`}
          />
        </div>
      </div>

      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  );
};

export default Referee;
