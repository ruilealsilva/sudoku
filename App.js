import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import SudokuBoard from "./components/SudokuBoard";
import SudokuGenerator from "./components/SudokuGenerator";
import SudokuSolver from "./components/SudokuSolver";
import Timer from "./components/Timer";
import FinishModal from "./components/FinishModal";

export default function App() {
  // const [initialBoard, setInitialBoard] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(0)));
  const [isSolved, setIsSolved] = useState(false);
  const [isSolvable, setIsSolvable] = useState(true);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false);

  const handleNewGame = () => {
    setIsSolved(false);
    setTime(0);
    setIsTimerRunning(true);
    setBoard(Array(9).fill(Array(9).fill(0)));
    setIsFinishModalVisible(false);
  };

  const handleSolve = () => {
    if (isSolved) return;
    setIsTimerRunning(false);
    setIsSolved(true);
    // setBoard(Array(9).fill(Array(9).fill(0)));
  };

  const handleCheckSolution = () => {
    if (isSolved) return;
    setIsTimerRunning(false);
    setIsSolved(isSolvable);
    setIsFinishModalVisible(true);
  };

  const handleBoardChange = (newBoard) => {
    setBoard(newBoard);
    setIsSolved(false);
  };

  const handleGenerate = (newBoard) => {
    setTime(0);
    setIsTimerRunning(true);
    setBoard(newBoard);
  };

  const handleSolveBoard = () => {
    setIsTimerRunning(false);
    // setIsSolvable(SudokuSolver.isSolvable(board));
    // setIsSolved(SudokuSolver.solve(board));
    setIsFinishModalVisible(true);
  };

  const handleTimerTick = () => {
    setTime((prevTime) => prevTime + 1);
  };

  return (
    <View style={styles.container}>
      <Header
        onNewGame={handleNewGame}
        onSolve={handleSolve}
        onCheckSolution={handleCheckSolution}
      />
      <SudokuBoard board={board} onChange={handleBoardChange} />
      {/* <SudokuGenerator isVisible={!initialBoard} onSubmit={handleGenerate} />
      <SudokuSolver
        board={board}
        isVisible={isSolved}
        isSolvable={isSolvable}
        onSolve={handleSolveBoard}
      /> */}
      {/* <Timer isRunning={isTimerRunning} onTimeChange={handleTimerTick} /> */}
      {/* <FinishModal
        isVisible={isFinishModalVisible}
        time={time}
        onClose={handleNewGame}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
