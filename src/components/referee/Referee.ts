import { Piece, PieceType, Position, TeamType } from "../../constants";

export default class Referee {
  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.MY ? 1 : 6;
      const pawnDirection = team === TeamType.MY ? 1 : -1;

      // Pawn Movement

      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.isTileOccupied(
            desiredPosition.x,
            desiredPosition.y,
            boardState
          ) &&
          !this.isTileOccupied(
            desiredPosition.x,
            desiredPosition.y - pawnDirection,
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          !this.isTileOccupied(desiredPosition.x, desiredPosition.y, boardState)
        ) {
          return true;
        }
      }

      // Pawn Attacking
      else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        // Upper or Bottom Left Attacking

        if (
          this.isTileOccupiedByEnemy(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        // Upper or Bottom Right Attacking

        if (
          this.isTileOccupiedByEnemy(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      }
    }

    if (type === PieceType.KNIGHT) {
      // Top Line

      if (desiredPosition.y - initialPosition.y === 2) {
        if (desiredPosition.x - initialPosition.x === -1) {
          console.log("Upper left knights movement");
        }
        if (desiredPosition.x - initialPosition.x === 1) {
          console.log("Upper right knights movement");
        }
      }

      // Right Line

      if (desiredPosition.x - initialPosition.x === 2) {
        if (desiredPosition.y - initialPosition.y === -1) {
          console.log("Bottom right knights movement");
        }
        if (desiredPosition.y - initialPosition.y === 1) {
          console.log("Top right knights movement");
        }
      }

      // Bottom Line

      if (desiredPosition.y - initialPosition.y === -2) {
        if (desiredPosition.x - initialPosition.x === -1) {
          console.log("Bottom left knights movement");
        }
        if (desiredPosition.x - initialPosition.x === 1) {
          console.log("Bottom right knights movement");
        }
      }

      // Left Line

      if (desiredPosition.x - initialPosition.x === -2) {
        if (desiredPosition.y - initialPosition.y === -1) {
          console.log("Bottom left knights movement");
        }
        if (desiredPosition.y - initialPosition.y === 1) {
          console.log("Top left knights movement");
        }
      }
    }

    return false;
  }

  isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isTileOccupiedByEnemy(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const pawnDirection = team === TeamType.MY ? 1 : -1;

    if (type === PieceType.PAWN) {
      // Pawn Attacking
      if (
        desiredPosition.x - initialPosition.x === -1 ||
        (desiredPosition.x - initialPosition.x === 1 &&
          desiredPosition.y - initialPosition.y === pawnDirection)
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );

        if (piece) {
          return true;
        }
      }
    }

    return false;
  }
}
