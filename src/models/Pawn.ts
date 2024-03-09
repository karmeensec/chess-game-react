import { Piece, Position } from ".";
import { PieceType, TeamType } from "../types";

export class Pawn extends Piece {
  enPassant?: boolean;

  constructor(
    position: Position,
    team: TeamType,
    enPassant?: boolean,
    possibleMoves: Position[] = []
  ) {
    super(position, PieceType.PAWN, team);
    this.enPassant = enPassant;
    this.possibleMoves = possibleMoves;
  }

  clone(): Pawn {
    return new Pawn(
      this.position.clone(),
      this.team,
      this.enPassant,
      this.possibleMoves?.map((m) => m.clone())
    );
  }
}
