import { Position, TeamType, samePosition } from "../../../constants";
import { Piece } from "../../../models/Piece";
import {
  isTileEmptyOrOccupiedByEnemy,
  isTileOccupied,
  isTileOccupiedByEnemy,
} from "./GeneralRules";

export const kingMovement = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 2; i++) {
    // Diagonal

    const multiplierX =
      desiredPosition.x < initialPosition.x
        ? -1
        : desiredPosition.x > initialPosition.x
        ? 1
        : 0;
    const multiplierY =
      desiredPosition.y < initialPosition.y
        ? -1
        : desiredPosition.y > initialPosition.y
        ? 1
        : 0;

    const passedPosition: Position = {
      x: initialPosition.x + i * multiplierX,
      y: initialPosition.y + i * multiplierY,
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

  return false;
};

export const getPossibleKingMoves = (
  king: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  // Top movement

  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x, y: king.position.y + i };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement

  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x, y: king.position.y - i };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement

  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x - i, y: king.position.y };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement

  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x + i, y: king.position.y };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Upper Right
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x + i, y: king.position.y + i };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom Right
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x + i, y: king.position.y - i };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom Left
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x - i, y: king.position.y - i };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Upper Left
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x - i, y: king.position.y + i };

    if (!isTileOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByEnemy(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
