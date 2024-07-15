export default class BestPlay {
  static combinacionesGanadoras = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];
  checkWinner(tablero) {
    //tablero es un array de arrays

    for (let i = 0; i < BestPlay.combinacionesGanadoras.length; i++) {
      const [a, b, c] = BestPlay.combinacionesGanadoras[i];

      if (
        tablero[a[0]][a[1]] === tablero[b[0]][b[1]] &&
        tablero[a[0]][a[1]] === tablero[c[0]][c[1]] &&
        tablero[a[0]][a[1]] !== ""
      ) {
        return tablero[a[0]][a[1]];
      }
    }
    return tablero.flat().includes("") ? null : "Draw!";
  }

  minimax(board, depth, isMaximizing) {
    const winner = this.checkWinner(board);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (winner === "draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (board[i][j] === "") {
            board[i][j] = "O";
            const score = this.minimax(board, depth + 1, false);
            board[i][j] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (board[i][j] === "") {
            board[i][j] = "X";
            const score = this.minimax(board, depth + 1, true);
            board[i][j] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  findBestMove(board) {
    let bestScore = -Infinity;
    let iMove = -1;
    let jMove = -1;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") {
          board[i][j] = "O";
          const score = this.minimax(board, 0, false);
          board[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            iMove = i;
            jMove = j;
          }
        }
      }
    }
    return [iMove, jMove];
  }

  getBestMoveTimeSpacing(matrix, time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.findBestMove(matrix));
      }, time);
    });
  }

  getCoordinatesWinner(board) {
    const combinacionGanadora = [];

    for (let i = 0; i < BestPlay.combinacionesGanadoras.length; i++) {
      const [a, b, c] = BestPlay.combinacionesGanadoras[i];
      if (
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]] &&
        board[a[0]][a[1]] !== ""
      ) {
        combinacionGanadora.push([a[0], a[1]]);
        combinacionGanadora.push([b[0], b[1]]);
        combinacionGanadora.push([c[0], c[1]]);
      }
    }
    return combinacionGanadora;
  }
}
