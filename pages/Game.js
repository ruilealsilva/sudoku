import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import SudokuBoard from "../components/SudokuBoard";
import Timer from "../components/Timer";
import FinishModal from "../components/FinishModal";
import generateBoard from "../utils/generateBoard";

function findArrayDifferences(arr1, arr2) {
  const differences = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        differences.push({ row: i, col: j });
      }
    }
  }
  return differences;
}

const emptyBoard = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => 0)
);

//
// Next steps: difficulty and maybe high score.

const Game = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [puzzle, setPuzzle] = useState(emptyBoard);
  const [isOutsideClick, setIsOutsideClick] = useState(false);
  const [levelSolution, setLevelSolution] = useState(false);
  const [wrongValueCells, setWrongValueCells] = useState([]);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false);
  const route = useRoute();

  const handleNewGame = () => {
    setWrongValueCells([]);
    const difficulty = route.params?.difficulty || "moderate";
    const { puzzle: newPuzzle, solution } = generateBoard(difficulty);
    setTime(0);
    setIsTimerRunning(true);
    setBoard(newPuzzle);
    setPuzzle(newPuzzle);
    setLevelSolution(solution);
  };

  useEffect(() => {
    handleNewGame();
  }, []);

  // Following logic should not be a useEffect
  useEffect(() => {
    const isBoardFilled = board.every((row) => row.every((cell) => cell !== 0));
    const isBoardCorrect =
      isBoardFilled && findArrayDifferences(board, levelSolution).length === 0;

    if (isBoardCorrect) {
      // Board is solved
      setIsTimerRunning(false);
      setIsFinishModalVisible(true);
    } else {
      if (board && levelSolution && isBoardFilled)
        setWrongValueCells(findArrayDifferences(board, levelSolution));
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
        <SudokuBoard
          initialBoard={puzzle}
          wrongValueCells={wrongValueCells}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Game;
