import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import SudokuBoard from "../components/SudokuBoard";
import Timer from "../components/Timer";
import FinishModal from "../components/FinishModal";
import { setHighScore, findArrayDifferences, generateBoard } from "../utils";
import { emptyBoard } from "../constants";

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

  const difficulty = route.params?.difficulty || "moderate";

  const handleNewGame = () => {
    setWrongValueCells([]);
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
      setHighScore(difficulty, time);
    } else {
      if (board && levelSolution && isBoardFilled)
        setWrongValueCells(findArrayDifferences(board, levelSolution));
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
