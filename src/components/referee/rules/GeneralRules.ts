import { TeamType } from "../../../constants";
import { Piece, Position } from "../../../models";

export const isTileOccupied = (
  position: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => p.samePosition(position));

  if (piece) {
    return true;
  } else {
    return false;
  }
};

export const isTileOccupiedByEnemy = (
  position: Position,
  boardState: Piece[],
  team: TeamType
): boolean => {
  const piece = boardState.find(
    (p) => p.samePosition(position) && p.team !== team
  );

  if (piece) {
    return true;
  } else {
    return false;
  }
};

export const isTileEmptyOrOccupiedByEnemy = (
  position: Position,
  boardState: Piece[],
  team: TeamType
): boolean => {
  return (
    !isTileOccupied(position, boardState) ||
    isTileOccupiedByEnemy(position, boardState, team)
  );
};
