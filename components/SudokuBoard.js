import React, { useState } from "react";
import { View } from "react-native";
import SudokuBoard from "react-native-sudoku-board";

const SudokuGameBoard = ({ board, onChange }) => {
  const [gameBoard, setGameBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const handleBoardChange = (newBoard) => {
    setGameBoard(newBoard);
    onChange(newBoard);
  };

  return (
    <View>
      <SudokuBoard board={board} onBoardChange={handleBoardChange} />
    </View>
  );
};

export default SudokuGameBoard;
