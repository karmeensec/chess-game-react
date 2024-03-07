import { Piece, PieceType, Position, TeamType } from "../../constants";
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
} from "./rules";

export default class Referee {
  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    let validMove = false;

    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.KNIGHT:
        validMove = knightMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.BISHOP:
        validMove = bishopMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.ROOK:
        validMove = rookMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.QUEEN:
        validMove = queenMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.KING:
        validMove = kingMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
    }

    return validMove;
  }

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
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
  }

  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const pawnDirection = team === TeamType.MY ? 1 : -1;

    if (type === PieceType.PAWN) {
      // Pawn Attacking
      if (
        desiredPosition.x - initialPosition.x === -1 ||
        (desiredPosition.x - initialPosition.x === 1 &&
          desiredPosition.y - initialPosition.y === pawnDirection)
      ) {
        const piece = boardState.find(
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
  }
}
