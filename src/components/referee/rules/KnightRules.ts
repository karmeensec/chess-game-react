import { Piece, Position, TeamType } from "../../../constants";
import { isTileEmptyOrOccupiedByEnemy } from "./GeneralRules";

export const knightMovement = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // Top/Bottom Side

      if (desiredPosition.y - initialPosition.y === 2 * i) {
        if (desiredPosition.x - initialPosition.x === j) {
          if (isTileEmptyOrOccupiedByEnemy(desiredPosition, boardState, team)) {
            return true;
          }
        }
      }

      // Right/Left Side

      if (desiredPosition.x - initialPosition.x === 2 * i) {
        if (desiredPosition.y - initialPosition.y === j) {
          if (isTileEmptyOrOccupiedByEnemy(desiredPosition, boardState, team)) {
            return true;
          }
        }
      }
    }
  }

  return false;
};
