import { Position, TeamType, samePosition } from "../../../constants";
import { Piece } from "../../../models/Piece";
import {
  isTileEmptyOrOccupiedByEnemy,
  isTileOccupied,
  isTileOccupiedByEnemy,
} from "./GeneralRules";

export const rookMovement = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  if (initialPosition.x === desiredPosition.x) {
    for (let i = 1; i < 8; i++) {
      const multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;

      const passedPosition: Position = {
        x: initialPosition.x,
        y: initialPosition.y + i * multiplier,
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

  if (initialPosition.y === desiredPosition.y) {
    for (let i = 1; i < 8; i++) {
      const multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;

      const passedPosition: Position = {
        x: initialPosition.x + i * multiplier,
        y: initialPosition.y,
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

export const getPossibleRookMoves = (
  rook: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  // Top movement

  for (let i = 1; i < 8; i++) {
    const destination = { x: rook.position.x, y: rook.position.y + i };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement

  for (let i = 1; i < 8; i++) {
    const destination = { x: rook.position.x, y: rook.position.y - i };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement

  for (let i = 1; i < 8; i++) {
    const destination = { x: rook.position.x - i, y: rook.position.y };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement

  for (let i = 1; i < 8; i++) {
    const destination = { x: rook.position.x + i, y: rook.position.y };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
