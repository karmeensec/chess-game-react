export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const verticalAxis = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
}

export enum PieceType {
  PAWN,
  ROOK,
  BISHOP,
  KNIGHT,
  QUEEN,
  KING,
}

export enum TeamType {
  OPPONENT,
  MY,
}

export const initialBoardState: Piece[] = [];

export const teamTypes = [TeamType.OPPONENT, TeamType.MY];
