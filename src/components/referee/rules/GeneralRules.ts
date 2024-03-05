import { Piece, Position, TeamType, samePosition } from "../../../constants";

export const isTileOccupied = (
  position: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => samePosition(p.position, position));

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
    (p) => samePosition(p.position, position) && p.team !== team
  );

  if (piece) {
    return true;
  } else {
    return false;
  }
};
