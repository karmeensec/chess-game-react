import Chessboard from "../Chessboard/Chessboard";
import { Position } from "../../constants";

const Referee = () => {
  const getPossibleMoves = (): Position[] => {
    console.log("Get moves");
    return [];
  };

  const playMove = (): void => {
    console.log("Play move");
  };

  return (
    <>
      <Chessboard getPossibleMoves={getPossibleMoves} playMove={playMove} />
    </>
  );
};

export default Referee;
