import { Piece, Position, TeamType } from "../../../constants";

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
      !this.isTileOccupied(desiredPosition, boardState) &&
      !this.isTileOccupied(
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
    if (!this.isTileOccupied(desiredPosition, boardState)) {
      return true;
    }
  }

  // Pawn Attacking
  if (
    desiredPosition.x - initialPosition.x === -1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    // Upper or Bottom Left Attacking

    if (this.isTileOccupiedByEnemy(desiredPosition, boardState, team)) {
      return true;
    }
  }
  if (
    desiredPosition.x - initialPosition.x === 1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    // Upper or Bottom Right Attacking

    if (this.isTileOccupiedByEnemy(desiredPosition, boardState, team)) {
      return true;
    }
  }

  return false;
};
