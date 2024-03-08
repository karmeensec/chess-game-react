import { Piece, Position } from "./models";

export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const VERTICAL_AXIS = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

export const GRID_SIZE = 100;

export const samePosition = (p1: Position, p2: Position) => {
  return p1.x === p2.x && p1.y === p2.y;
};

export enum PieceType {
  PAWN = "pawn",
  ROOK = "rook",
  BISHOP = "bishop",
  KNIGHT = "knight",
  QUEEN = "queen",
  KING = "king",
}

export enum TeamType {
  OPPONENT = "b",
  MY = "w",
}

export const teamTypes = [TeamType.OPPONENT, TeamType.MY];

export const initialBoardState: Piece[] = [
  // Rooks

  new Piece(new Position(0, 7), PieceType.ROOK, TeamType.OPPONENT),

  new Piece(new Position(7, 7), PieceType.ROOK, TeamType.OPPONENT),

  new Piece(new Position(0, 0), PieceType.ROOK, TeamType.MY),

  new Piece(new Position(7, 0), PieceType.ROOK, TeamType.MY),

  // Knights

  new Piece(new Position(1, 7), PieceType.KNIGHT, TeamType.OPPONENT),

  new Piece(new Position(6, 7), PieceType.KNIGHT, TeamType.OPPONENT),

  new Piece(new Position(1, 0), PieceType.KNIGHT, TeamType.MY),

  new Piece(new Position(6, 0), PieceType.KNIGHT, TeamType.MY),

  // Bishops

  new Piece(new Position(2, 7), PieceType.BISHOP, TeamType.OPPONENT),

  new Piece(new Position(5, 7), PieceType.BISHOP, TeamType.OPPONENT),

  new Piece(new Position(2, 0), PieceType.BISHOP, TeamType.MY),

  new Piece(new Position(5, 0), PieceType.BISHOP, TeamType.MY),

  // Queen

  new Piece(new Position(3, 7), PieceType.QUEEN, TeamType.OPPONENT),

  new Piece(new Position(3, 0), PieceType.QUEEN, TeamType.MY),

  // King

  new Piece(new Position(4, 7), PieceType.KING, TeamType.OPPONENT),

  new Piece(new Position(4, 0), PieceType.KING, TeamType.MY),
];
