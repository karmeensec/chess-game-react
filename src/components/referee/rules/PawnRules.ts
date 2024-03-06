import { Piece, Position, TeamType } from "../../../constants";
import { isTileOccupied, isTileOccupiedByEnemy } from "./GeneralRules.ts";

export const pawnMovement = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const specialRow = team === TeamType.MY ? 1 : 6;
  const pawnDirection = team === TeamType.MY ? 1 : -1;

  // Pawn Movement

  if (
    initialPosition.x === desiredPosition.x &&
    initialPosition.y === specialRow &&
    desiredPosition.y - initialPosition.y === 2 * pawnDirection
  ) {
    if (
      !isTileOccupiedByEnemy(desiredPosition, boardState, team) &&
      !isTileOccupied(
        { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
        boardState
      )
    ) {
      return true;
    }
  }
  if (
    initialPosition.x === desiredPosition.x &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (!isTileOccupied(desiredPosition, boardState)) {
      return true;
    }
  }

  // Pawn Attacking
  if (
    desiredPosition.x - initialPosition.x === -1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    // Upper or Bottom Left Attacking

    if (isTileOccupiedByEnemy(desiredPosition, boardState, team)) {
      return true;
    }
  }
  if (
    desiredPosition.x - initialPosition.x === 1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    // Upper or Bottom Right Attacking

    if (isTileOccupiedByEnemy(desiredPosition, boardState, team)) {
      return true;
    }
  }

  return false;
};

export const getPossiblePawnMoves = (
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  const pawnDirection = pawn.team === TeamType.MY ? 1 : -1;

  if (
    !isTileOccupied(
      { x: pawn.position.x, y: pawn.position.y + pawnDirection },
      boardState
    )
  ) {
    possibleMoves.push({
      x: pawn.position.x,
      y: pawn.position.y + pawnDirection,
    });
  }
  return possibleMoves;
};
