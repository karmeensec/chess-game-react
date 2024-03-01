import { PieceType, TeamType } from "../Chessboard/Chessboard";

export default class Referee {
  isValidMove(
    prevX: number,
    prevY: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType
  ) {
    console.log("Referee is checking....");
    console.log("Current piece location: ", x, y);
    console.log("Previous piece location: ", prevX, prevY);
    console.log("Piece type: ", type);
    console.log("Team type: ", team);

    if (type === PieceType.PAWN) {
      if (team === TeamType.MY) {
        if (prevY === 1) {
          if (prevX === x && (y - prevY === 1 || y - prevY === 2)) {
            console.log("Valid Move");
            return true;
          }
        } else {
          if (prevX === x && y - prevY === 1) {
            return true;
          }
        }
      }

      return false;
    }
  }
}
