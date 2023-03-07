import React from "react";
import { Text } from "react-native";

const SudokuSolver = ({ board }) => {
  const solve = () => {
    // Implement backtracking algorithm to solve Sudoku board
    const emptyCell = findEmptyCell(board);
    if (emptyCell === null) {
      return true; // board is complete
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(row, col, num)) {
        board[row][col] = num;
        if (solve()) {
          return true;
        }
        board[row][col] = 0; // backtrack
      }
    }
    return false;
  };

  const isValidMove = (row, col, num) => {
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

  const copyBoard = () => {
    // Create a deep copy of the board
    return board.map((row) => [...row]);
  };

  const solveBoard = () => {
    const solvedBoard = copyBoard();
    solve();
    return solvedBoard;
  };

  const renderBoard = () => {
    // Convert solved board to formatted string
    const boardString = solveBoard()
      .map((row) => row.join(" ")) // Convert each row to a string
      .join("\n"); // Join rows together with line breaks
    return <Text>{boardString}</Text>; // Render board as Text component
  };

  return renderBoard();
};

export default SudokuSolver;
