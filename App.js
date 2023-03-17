import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Header from "./components/Header";
import SudokuBoard from "./components/SudokuBoard";
import Timer from "./components/Timer";
import FinishModal from "./components/FinishModal";
import generateBoard from "./utils/generateBoard";

function compareArrays(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

const emptyBoard = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => 0)
);

//
// Next steps: difficulty and maybe high score.

export default function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [isOutsideClick, setIsOutsideClick] = useState(false);
  const [levelSolution, setLevelSolution] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false);

  const handleNewGame = () => {
    const { puzzle, solution } = generateBoard("test");
    setTime(0);
    setIsTimerRunning(true);
    setBoard(puzzle);
    setLevelSolution(solution);
  };

  useEffect(() => {
    handleNewGame();
  }, []);

  useEffect(() => {
    const isBoardFilled = board.every((row) => row.every((cell) => cell !== 0));
    const isBoardCorrect = isBoardFilled && compareArrays(board, levelSolution);

    if (isBoardCorrect) {
      // Board is solved
      setIsTimerRunning(false);
      setIsFinishModalVisible(true);
    } else {
      // Board is not solved
      // Do something else, like show an error message or reset the board
    }
  }, [board]);

  const handleTimerTick = () => {
    setTime((prevTime) => prevTime + 1);
  };

  const handleCloseModal = () => {
    setIsFinishModalVisible(false);
    handleNewGame();
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsOutsideClick(true)}>
    <View style={styles.container}>
      <Header title={"Sudoku Tuga"} />
      <SudokuBoard
        board={board}
        time={time}
        onChange={(newBoard) => setBoard(newBoard)}
        isOutsideClick={isOutsideClick}
        setIsOutsideClick={setIsOutsideClick}
      />
      <Timer isRunning={isTimerRunning} onTimeChange={handleTimerTick} />
      <FinishModal
        isVisible={isFinishModalVisible}
        time={time}
        onClose={handleCloseModal}
      />
    </View>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
