import {
  Piece,
  PieceType,
  Position,
  TeamType,
  samePosition,
} from "../../constants";

export default class Referee {
  pawnMovement(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const specialRow = team === TeamType.MY ? 1 : 6;
    const pawnDirection = team === TeamType.MY ? 1 : -1;

    // Pawn Movement

    if (
      initialPosition.x === desiredPosition.x &&
      initialPosition.y === specialRow &&
      desiredPosition.y - initialPosition.y === 2 * pawnDirection
    ) {
      if (
        !this.isTileOccupied(desiredPosition, boardState) &&
        !this.isTileOccupied(
          { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
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
      if (!this.isTileOccupied(desiredPosition, boardState)) {
        return true;
      }
    }

    // Pawn Attacking
    if (
      desiredPosition.x - initialPosition.x === -1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      // Upper or Bottom Left Attacking

      if (this.isTileOccupiedByEnemy(desiredPosition, boardState, team)) {
        return true;
      }
    }
    if (
      desiredPosition.x - initialPosition.x === 1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      // Upper or Bottom Right Attacking

      if (this.isTileOccupiedByEnemy(desiredPosition, boardState, team)) {
        return true;
      }
    }

    return false;
  }

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
            console.log("Upper/Bottom left/right knights movement");
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

            console.log("Bottom/Top right/Left knights movement");
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

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
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

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
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
          x: initialPosition.x + i,
          y: initialPosition.y - i,
        };

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
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
          x: initialPosition.x + i,
          y: initialPosition.y - i,
        };

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
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
    console.log("Rook");

    if (initialPosition.x === desiredPosition.x) {
      console.log("Moving vertical");

      for (let i = 1; i < 8; i++) {
        const multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;

        const passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }

    if (initialPosition.y === desiredPosition.y) {
      console.log("Moving horizontal");

      for (let i = 1; i < 8; i++) {
        const multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;

        const passedPosition: Position = {
          x: initialPosition.x + i * multiplier,
          y: initialPosition.y,
        };

        console.log(passedPosition);

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
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
      // Top

      if (
        desiredPosition.y > initialPosition.y &&
        desiredPosition.x === initialPosition.x
      ) {
        const passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i,
        };

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Right

      if (
        desiredPosition.y === initialPosition.y &&
        desiredPosition.x > initialPosition.x
      ) {
        const passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y,
        };

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Bottom

      if (
        desiredPosition.y < initialPosition.y &&
        desiredPosition.x === initialPosition.x
      ) {
        const passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y - i,
        };

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Left

      if (
        desiredPosition.y === initialPosition.y &&
        desiredPosition.x < initialPosition.x
      ) {
        const passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y,
        };

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByEnemy(passedPosition, boardState, team)
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Top right

      if (
        desiredPosition.y > initialPosition.y &&
        desiredPosition.x > initialPosition.x
      ) {
        console.log("Moving top right");
      }

      // Bottom right

      if (
        desiredPosition.y < initialPosition.y &&
        desiredPosition.x > initialPosition.x
      ) {
        console.log("Moving bottom right");
      }

      // Bottom left

      if (
        desiredPosition.y < initialPosition.y &&
        desiredPosition.x < initialPosition.x
      ) {
        console.log("Moving bottom left");
      }

      // Top left

      if (
        desiredPosition.y > initialPosition.y &&
        desiredPosition.x < initialPosition.x
      ) {
        console.log("Moving top left");
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
        validMove = this.pawnMovement(
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
    }

    return validMove;
  }

  isTileOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position));

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isTileOccupiedByEnemy(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isTileEmptyOrOccupiedByEnemy(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    return (
      !this.isTileOccupied(position, boardState) ||
      this.isTileOccupiedByEnemy(position, boardState, team)
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
