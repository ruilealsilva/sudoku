import { useEffect } from "react";

const SudokuGenerator = ({ onSubmit }) => {
  const shuffle = (array) => {
    // Implement Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const solve = (board) => {
    // Implement backtracking algorithm to solve Sudoku board
    const emptyCell = findEmptyCell(board);
    if (emptyCell === null) {
      return true; // board is complete
    }

    const [row, col] = emptyCell;
    const candidates = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 0; i < candidates.length; i++) {
      const num = candidates[i];
      if (isValidMove(board, row, col, num)) {
        board[row][col] = num;

        if (solve(board)) {
          return true;
        }

        board[row][col] = 0;
      }
    }

    return false; // backtrack
  };

  const findEmptyCell = (board) => {
    // Helper function to find an empty cell on the board
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null; // board is full
  };

  const isValidMove = (board, row, col, num) => {
    // Helper function to check if a move is valid
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false; // num is already in row or column
      }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) {
          return false; // num is already in box
        }
      }
    }

    return true; // move is valid
  };

  useEffect(() => {
    // Generate a new Sudoku board when the component mounts
    const board = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => 0)
    );
    solve(board);
    onSubmit(board);
  }, []);

  return null; // component doesn't render anything
};

export default SudokuGenerator;
