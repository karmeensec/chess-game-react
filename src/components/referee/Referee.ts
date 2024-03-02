import { Piece, PieceType, TeamType } from "../Chessboard/Chessboard";

export default class Referee {
  isValidMove(
    prevX: number,
    prevY: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    console.log("Referee is checking....");
    console.log("Current piece location: ", x, y);
    console.log("Previous piece location: ", prevX, prevY);
    console.log("Piece type: ", type);
    console.log("Team type: ", team);

    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.MY ? 1 : 6;
      const pawnDirection = team === TeamType.MY ? 1 : -1;

      // Pawn Movement

      if (
        prevX === x &&
        prevY === specialRow &&
        y - prevY === 2 * pawnDirection
      ) {
        if (
          !this.isTileOccupied(x, y, boardState) &&
          !this.isTileOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (prevX === x && y - prevY === pawnDirection) {
        if (!this.isTileOccupied(x, y, boardState)) {
          return true;
        }
      }

      // Pawn Attacking
      else if (x - prevX === -1 && y - prevY === pawnDirection) {
        // Upper or Bottom Left Attacking

        console.log("Upper / Bottom Left");
      } else if (x - prevX === 1 && y - prevY === pawnDirection) {
        // Upper or Bottom Right Attacking

        console.log("Upper / Bottom Right");
      }
    }

    return false;
  }

  isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
    console.log("Check if tile is occupied");

    const piece = boardState.find((p) => p.x === x && p.y === y);

    if (piece) {
      return true;
    } else {
      return false;
    }
  }
}
