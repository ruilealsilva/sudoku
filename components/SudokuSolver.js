import React from "react";

const SudokuSolver = ({ board }) => {
  const solve = (board) => {
    // Implement backtracking algorithm to solve Sudoku board
    const emptyCell = findEmptyCell(board);
    if (emptyCell === null) {
      return true; // board is complete
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(board, row, col, num)) {
        board[row][col] = num;
        if (solve(board)) {
          return true;
        }
        board[row][col] = 0; // backtrack
      }
    }
    return false;
  };

  const isValidMove = (board, row, col, num) => {
    // Check if number is valid in row, column, and 3x3 box
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const findEmptyCell = (board) => {
    // Find first empty cell in board
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null; // board is complete
  };

  const copyBoard = (board) => {
    // Create a deep copy of the board
    return board.map((row) => [...row]);
  };

  const solveBoard = () => {
    const solvedBoard = copyBoard(board);
    solve(solvedBoard);
    return solvedBoard;
  };

  const isSolved = () => {
    const solvedBoard = solveBoard();
    return isBoardEqual(solvedBoard, board);
  };

  const isBoardEqual = (board1, board2) => {
    // Check if two boards are equal
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board1[row][col] !== board2[row][col]) {
          return false;
        }
      }
    }
    return true;
  };

  return isSolved();
};

export default SudokuSolver;
