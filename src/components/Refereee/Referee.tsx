import Chessboard from "../Chessboard/Chessboard";
import { initialBoard, teamTypes } from "../../constants";
import { useEffect, useRef, useState } from "react";
import {
  pawnMovement,
  knightMovement,
  bishopMovement,
  rookMovement,
  queenMovement,
  kingMovement,
} from "../referee/rules";
import blackRook from "../../assets/images/rook_b.png";
import whiteRook from "../../assets/images/rook_w.png";
import blackKnight from "../../assets/images/knight_b.png";
import whiteKnight from "../../assets/images/knight_w.png";
import blackBishop from "../../assets/images/bishop_b.png";
import whiteBishop from "../../assets/images/bishop_w.png";
import blackQueen from "../../assets/images/queen_b.png";
import whiteQueen from "../../assets/images/queen_w.png";
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

    board.pieces = board.pieces.map((piece) => {
      if (piece.samePiecePosition(promotionPawn)) {
        const teamType = promotionPawn.team;
        let promotedImage = "";

        switch (pieceType) {
          case PieceType.ROOK:
            promotedImage = teamType === TeamType.MY ? whiteRook : blackRook;
            break;
          case PieceType.KNIGHT:
            promotedImage =
              teamType === TeamType.MY ? whiteKnight : blackKnight;
            break;
          case PieceType.BISHOP:
            promotedImage =
              teamType === TeamType.MY ? whiteBishop : blackBishop;
            break;
          case PieceType.QUEEN:
            promotedImage = teamType === TeamType.MY ? whiteQueen : blackQueen;
            break;
          default:
            break;
        }

        return {
          ...piece,
          type: pieceType,
          image: promotedImage,
        };
      }
      return piece;
    });

    updatePossibleMoves();
    modalRef.current?.classList.add("hidden");
  };

  const promotionTeamType = () => {
    const promotedTeam =
      promotionPawn?.team === TeamType.MY ? teamTypes[1] : teamTypes[0];

    return promotedTeam;
  };

  const getPromotionImageSrc = (
    teamType: TeamType,
    pieceType: PieceType
  ): string => {
    switch (pieceType) {
      case PieceType.ROOK:
        return teamType === TeamType.MY ? whiteRook : blackRook;
      case PieceType.KNIGHT:
        return teamType === TeamType.MY ? whiteKnight : blackKnight;
      case PieceType.BISHOP:
        return teamType === TeamType.MY ? whiteBishop : blackBishop;
      case PieceType.QUEEN:
        return teamType === TeamType.MY ? whiteQueen : blackQueen;
      default:
        return "";
    }
  };

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            src={getPromotionImageSrc(promotionTeamType(), PieceType.ROOK)}
            onClick={() => promotePawn(PieceType.ROOK)}
          />
          <img
            src={getPromotionImageSrc(promotionTeamType(), PieceType.KNIGHT)}
            onClick={() => promotePawn(PieceType.KNIGHT)}
          />
          <img
            src={getPromotionImageSrc(promotionTeamType(), PieceType.BISHOP)}
            onClick={() => promotePawn(PieceType.BISHOP)}
          />
          <img
            src={getPromotionImageSrc(promotionTeamType(), PieceType.QUEEN)}
            onClick={() => promotePawn(PieceType.QUEEN)}
          />
        </div>
      </div>

      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  );
};

export default Referee;
