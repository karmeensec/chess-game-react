import { Piece, Position } from ".";
import { PieceType, TeamType } from "../types";

export class Pawn extends Piece {
  enPassant?: boolean;

  constructor(position: Position, team: TeamType, enPassant: boolean) {
    super(position, PieceType.PAWN, team);
    this.enPassant = enPassant;
  }
}
