import React, { useState } from "react";
import { View } from "react-native";
import SudokuBoard from "react-native-sudoku-board";

const SudokuBoard = ({board, onChange}) => {
  const [board, setBoard] = useState([
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
    setBoard(newBoard);
  };

  return (
    <View>
      <SudokuBoard board={board} onBoardChange={onChange} />
    </View>
  );
};

export default SudokuBoard;
