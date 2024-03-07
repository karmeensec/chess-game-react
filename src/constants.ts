import { Piece } from "./models/Piece";

import blackRook from "./assets/images/rook (1).png";
import whiteRook from "./assets/images/rook.png";
import blackKnight from "./assets/images/knight (1).png";
import whiteKnight from "./assets/images/knight.png";
import blackBishop from "./assets/images/bishop (1).png";
import whiteBishop from "./assets/images/bishop.png";
import blackQueen from "./assets/images/queen (1).png";
import whiteQueen from "./assets/images/queen.png";
import blackKing from "./assets/images/king (1).png";
import whiteKing from "./assets/images/king.png";

export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const VERTICAL_AXIS = ["1", " 2", " 3", " 4", " 5", "6", " 7", " 8"];

export const GRID_SIZE = 100;

export const samePosition = (p1: Position, p2: Position) => {
  return p1.x === p2.x && p1.y === p2.y;
};

export interface Position {
  x: number;
  y: number;
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

export const teamTypes = [TeamType.OPPONENT, TeamType.MY];

export const initialBoardState: Piece[] = [
  // Rooks

  new Piece(
    blackRook,
    {
      x: 0,
      y: 7,
    },
    PieceType.ROOK,
    TeamType.OPPONENT
  ),

  new Piece(
    blackRook,
    {
      x: 7,
      y: 7,
    },
    PieceType.ROOK,
    TeamType.OPPONENT
  ),

  new Piece(
    whiteRook,
    {
      x: 0,
      y: 0,
    },
    PieceType.ROOK,
    TeamType.MY
  ),

  new Piece(
    whiteRook,
    {
      x: 7,
      y: 0,
    },
    PieceType.ROOK,
    TeamType.MY
  ),

  // Knights

  new Piece(
    blackKnight,
    {
      x: 1,
      y: 7,
    },
    PieceType.KNIGHT,
    TeamType.OPPONENT
  ),

  new Piece(
    blackKnight,
    {
      x: 6,
      y: 7,
    },
    PieceType.KNIGHT,
    TeamType.OPPONENT
  ),

  new Piece(
    whiteKnight,
    {
      x: 1,
      y: 0,
    },
    PieceType.KNIGHT,
    TeamType.MY
  ),

  new Piece(
    whiteKnight,
    {
      x: 6,
      y: 0,
    },
    PieceType.KNIGHT,
    TeamType.MY
  ),

  // Bishops

  new Piece(
    blackBishop,
    {
      x: 2,
      y: 7,
    },
    PieceType.BISHOP,
    TeamType.OPPONENT
  ),

  new Piece(
    blackBishop,
    {
      x: 5,
      y: 7,
    },
    PieceType.BISHOP,
    TeamType.OPPONENT
  ),

  new Piece(
    whiteBishop,
    {
      x: 2,
      y: 0,
    },
    PieceType.BISHOP,
    TeamType.MY
  ),

  new Piece(
    whiteBishop,
    {
      x: 5,
      y: 0,
    },
    PieceType.BISHOP,
    TeamType.MY
  ),

  // Queen

  new Piece(
    blackQueen,
    {
      x: 3,
      y: 7,
    },
    PieceType.BISHOP,
    TeamType.OPPONENT
  ),

  new Piece(
    whiteQueen,
    {
      x: 3,
      y: 0,
    },
    PieceType.BISHOP,
    TeamType.MY
  ),

  // King

  new Piece(
    blackKing,
    {
      x: 4,
      y: 7,
    },
    PieceType.BISHOP,
    TeamType.MY
  ),

  new Piece(
    whiteKing,
    {
      x: 4,
      y: 0,
    },
    PieceType.BISHOP,
    TeamType.MY
  ),
];
