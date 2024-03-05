import {
  Piece,
  PieceType,
  Position,
  TeamType,
  samePosition,
} from "../../constants";
import { isTileOccupied, isTileOccupiedByEnemy } from "./rules/GeneralRules.ts";

import { pawnMovement } from "./rules/PawnRules.ts";

export default class Referee {
  knightMovement(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        // Top/Bottom Side

        if (desiredPosition.y - initialPosition.y === 2 * i) {
          if (desiredPosition.x - initialPosition.x === j) {
            if (
              this.isTileEmptyOrOccupiedByEnemy(
                desiredPosition,
                boardState,
                team
              )
            ) {
              return true;
            }
          }
        }

        // Right/Left Side

        if (desiredPosition.x - initialPosition.x === 2 * i) {
          if (desiredPosition.y - initialPosition.y === j) {
            if (
              this.isTileEmptyOrOccupiedByEnemy(
                desiredPosition,
                boardState,
                team
              )
            ) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  bishopMovement(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      // Upper Right Movement
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y + i,
        };

        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Bottom Right Movement

      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y - i,
        };

        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Bottom Left Movement

      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y - i,
        };

        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Upper Left Movement

      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y + i,
        };

        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
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
  }

  rookMovement(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    if (initialPosition.x === desiredPosition.x) {
      for (let i = 1; i < 8; i++) {
        const multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;

        const passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };

        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
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
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
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
  }

  queenMovement(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
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
        if (
          this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
        ) {
          return true;
        }
      } else {
        if (isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    return false;
  }

  kingMovement(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
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
        if (
          this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
        ) {
          return true;
        }
      } else {
        if (isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }

    return false;
  }

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    let validMove = false;

    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.KNIGHT:
        validMove = this.knightMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.BISHOP:
        validMove = this.bishopMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.ROOK:
        validMove = this.rookMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.QUEEN:
        validMove = this.queenMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;

      case PieceType.KING:
        validMove = this.kingMovement(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
    }

    return validMove;
  }

  isTileEmptyOrOccupiedByEnemy(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    return (
      !isTileOccupied(position, boardState) ||
      isTileOccupiedByEnemy(position, boardState, team)
    );
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
