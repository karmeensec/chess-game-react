import { Piece, Position } from "../../../models";
import { TeamType } from "../../../types.ts";
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
        new Position(desiredPosition.x, desiredPosition.y - pawnDirection),
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
  const specialRow = pawn.team === TeamType.MY ? 1 : 6;

  const regularMove = new Position(
    pawn.position.x,
    pawn.position.y + pawnDirection
  );

  const specialMove = new Position(
    regularMove.x,
    regularMove.y + pawnDirection
  );

  const upperLeftAttack = new Position(
    pawn.position.x - 1,
    pawn.position.y + pawnDirection
  );

  const upperRightAttack = new Position(
    pawn.position.x + 1,
    pawn.position.y + pawnDirection
  );

  const leftPosition = new Position(pawn.position.x - 1, pawn.position.y);
  const rightPosition = new Position(pawn.position.x + 1, pawn.position.y);

  if (!isTileOccupied(regularMove, boardState)) {
    possibleMoves.push(regularMove);

    if (
      pawn.position.y === specialRow &&
      !isTileOccupied(specialMove, boardState)
    ) {
      possibleMoves.push(specialMove);
    }
  }

  if (isTileOccupiedByEnemy(upperLeftAttack, boardState, pawn.team)) {
    possibleMoves.push(upperLeftAttack);
  } else if (!isTileOccupied(upperLeftAttack, boardState)) {
    const leftPiece = boardState.find((p) => {
      p.samePosition(leftPosition);
    });

    if (leftPiece !== null && leftPiece?.enPassant) {
      possibleMoves.push(upperLeftAttack);
    }
  }
  if (isTileOccupiedByEnemy(upperRightAttack, boardState, pawn.team)) {
    possibleMoves.push(upperRightAttack);
  } else if (!isTileOccupied(upperRightAttack, boardState)) {
    const rightPiece = boardState.find((p) => {
      p.samePosition(rightPosition);
    });

    if (rightPiece !== null && rightPiece?.enPassant) {
      possibleMoves.push(upperRightAttack);
    }
  }

  return possibleMoves;
};
