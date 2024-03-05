import { Piece, Position, TeamType, samePosition } from "../../../constants";
import { isTileEmptyOrOccupiedByEnemy, isTileOccupied } from "./GeneralRules";

export const bishopMovement = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 8; i++) {
    // Upper Right Movement
    if (
      desiredPosition.x > initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      const passedPosition: Position = {
        x: initialPosition.x + i,
        y: initialPosition.y + i,
      };

      if (samePosition(passedPosition, desiredPosition)) {
        if (isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if (isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }

    // Bottom Right Movement

    if (
      desiredPosition.x > initialPosition.x &&
      desiredPosition.y < initialPosition.y
    ) {
      const passedPosition: Position = {
        x: initialPosition.x + i,
        y: initialPosition.y - i,
      };

      if (samePosition(passedPosition, desiredPosition)) {
        if (isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if (isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }

    // Bottom Left Movement

    if (
      desiredPosition.x < initialPosition.x &&
      desiredPosition.y < initialPosition.y
    ) {
      const passedPosition: Position = {
        x: initialPosition.x - i,
        y: initialPosition.y - i,
      };

      if (samePosition(passedPosition, desiredPosition)) {
        if (isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if (isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }

    // Upper Left Movement

    if (
      desiredPosition.x < initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      const passedPosition: Position = {
        x: initialPosition.x - i,
        y: initialPosition.y + i,
      };

      if (samePosition(passedPosition, desiredPosition)) {
        if (isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if (isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
  }

  return false;
};
