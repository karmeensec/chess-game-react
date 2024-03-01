import { PieceType } from "../Chessboard/Chessboard";

export default class Referee {
  isValidMove(
    prevX: number,
    prevY: number,
    x: number,
    y: number,
    type: PieceType
  ) {
    console.log("Referee is checking....");
    console.log("Current piece location: ", x, y);
    console.log("Previous piece location: ", prevX, prevY);
    console.log("Piece type: ", type);
    return true;
  }
}
