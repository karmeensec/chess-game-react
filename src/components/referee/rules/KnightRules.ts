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

export const getPossibleKnightMoves = (
  knight: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMoves: Position = {
        x: knight.position.x + j,
        y: knight.position.y + i * 2,
      };

      const horizontalMoves: Position = {
        x: knight.position.x + i * 2,
        y: knight.position.y + j,
      };

      if (
        isTileEmptyOrOccupiedByEnemy(verticalMoves, boardState, knight.team)
      ) {
        possibleMoves.push(verticalMoves);
      }

      if (
        isTileEmptyOrOccupiedByEnemy(horizontalMoves, boardState, knight.team)
      ) {
        possibleMoves.push(horizontalMoves);
      }
    }
  }

  return possibleMoves;
};
