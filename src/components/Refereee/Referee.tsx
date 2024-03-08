import Chessboard from "../Chessboard/Chessboard";
import { initialBoardState, teamTypes } from "../../constants";
import { useEffect, useRef, useState } from "react";
import {
  pawnMovement,
  knightMovement,
  bishopMovement,
  rookMovement,
  queenMovement,
  kingMovement,
  getPossiblePawnMoves,
  getPossibleKnightMoves,
  getPossibleBishopMoves,
  getPossibleRookMoves,
  getPossibleQueenMoves,
  getPossibleKingMoves,
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

const Referee = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updatePossibleMoves();
  }, []);

  const updatePossibleMoves = (): void => {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = getValidMoves(p, currentPieces);
        return p;
      });
    });
  };

  const playMove = (playedPiece: Piece, destination: Position): boolean => {
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

    const pawnDirection = playedPiece.team === TeamType.MY ? 1 : -1;

    if (enPassantMove) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          piece.enPassant === false;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          results.push(piece);
        } else if (
          !piece.samePosition(
            new Position(destination.x, destination.y - pawnDirection)
          )
        ) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant === false;
          }

          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      updatePossibleMoves();
      setPieces(updatedPieces);
    }

    if (validMove) {
      // Update the piece position

      const updatedPieces = pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          piece.enPassant =
            Math.abs(playedPiece.position.y - destination.y) === 2 &&
            piece.type === PieceType.PAWN;

          piece.position.x = destination.x;
          piece.position.y = destination.y;

          const promotionRow = piece.team === TeamType.MY ? 7 : 0;

          if (destination.y === promotionRow && piece.type === PieceType.PAWN) {
            modalRef.current?.classList.remove("hidden");
            setPromotionPawn(piece);
          }

          results.push(piece);
        } else if (
          !piece.samePosition(new Position(destination.x, destination.y))
        ) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant === false;
          }

          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      updatePossibleMoves();
      setPieces(updatedPieces);
    } else {
      return false;
    }
    return true;
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
          pieces
        );
        break;

      case PieceType.KNIGHT:
        validMove = knightMovement(
          initialPosition,
          desiredPosition,
          team,
          pieces
        );
        break;

      case PieceType.BISHOP:
        validMove = bishopMovement(
          initialPosition,
          desiredPosition,
          team,
          pieces
        );
        break;

      case PieceType.ROOK:
        validMove = rookMovement(
          initialPosition,
          desiredPosition,
          team,
          pieces
        );
        break;

      case PieceType.QUEEN:
        validMove = queenMovement(
          initialPosition,
          desiredPosition,
          team,
          pieces
        );
        break;

      case PieceType.KING:
        validMove = kingMovement(
          initialPosition,
          desiredPosition,
          team,
          pieces
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
        const piece = pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );

        if (piece) {
          return true;
        }
      }
    }

    return false;
  };

  const getValidMoves = (piece: Piece, boardState: Piece[]): Position[] => {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState);

      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState);

      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece, boardState);

      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState);

      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState);

      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState);

      default:
        return [];
    }
  };

  const promotePawn = (pieceType: PieceType) => {
    if (promotionPawn === undefined) {
      return;
    }

    const updatedPieces = pieces.map((piece) => {
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
    setPieces(updatedPieces);
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

      <Chessboard playMove={playMove} pieces={pieces} />
    </>
  );
};

export default Referee;
