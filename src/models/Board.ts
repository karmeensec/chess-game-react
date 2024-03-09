import { Piece, Position } from ".";
import {
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossiblePawnMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
} from "../components/referee/rules";
import { PieceType, TeamType } from "../types";
import { Pawn } from "./Pawn";

export class Board {
  pieces: Piece[];

  constructor(pieces: Piece[]) {
    this.pieces = pieces;
  }

  calculateAllMoves() {
    for (const piece of this.pieces) {
      piece.possibleMoves = this.getValidMoves(piece, this.pieces);
    }
  }

  getValidMoves = (piece: Piece, boardState: Piece[]): Position[] => {
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

  playMove(
    enPassantMove: boolean,
    destination: Position,
    playedPiece: Piece,
    validMove: boolean
  ): boolean {
    const pawnDirection = playedPiece.team === TeamType.MY ? 1 : -1;

    if (enPassantMove) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant === false;
          }
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          results.push(piece);
        } else if (
          !piece.samePosition(
            new Position(destination.x, destination.y - pawnDirection)
          )
        ) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant === false;
          }

          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
    }

    if (validMove) {
      // Update the piece position

      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant =
              Math.abs(playedPiece.position.y - destination.y) === 2 &&
              piece.type === PieceType.PAWN;
          }

          piece.position.x = destination.x;
          piece.position.y = destination.y;

          results.push(piece);
        } else if (!piece.samePosition(destination)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant === false;
          }

          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
    } else {
      return false;
    }

    return true;
  }

  clone(): Board {
    const clonedPieces = this.pieces.map((p) => p.clone());

    return new Board(clonedPieces);

    // return new Board(this.pieces.map((p) => p.clone()));
  }
}
