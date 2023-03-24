import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

const containerWidth = Dimensions.get("window").width * 0.9;
const cellSize = containerWidth / 9;

const SudokuBoard = ({
  initialBoard,
  board,
  wrongValueCells,
  onChange,
  time,
  isOutsideClick,
  setIsOutsideClick,
}) => {
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    if (time === 0 || isOutsideClick) {
      setSelectedCell(null);
      setIsOutsideClick(false);
    }
  }, [time, isOutsideClick]);

  const handleCellPress = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleNumberPress = (num) => {
    if (selectedCell) {
      const newBoard = board.map((row) => [...row]);
      newBoard[selectedCell.row][selectedCell.col] = num;
      onChange(newBoard);
    }
  };

  const renderCell = (row, col) => {
    const value = board[row][col];
    const isInitialBoardCell = initialBoard[row][col] !== 0;
    const isSelected =
      selectedCell && selectedCell.row === row && selectedCell.col === col;

    const isWrongValueCell = wrongValueCells.find(
      (item) => item.col === col && item.row === row
    );

    const isMultipleThirdRow = row % 3 === 0;
    const isMultipleThirdCol = (col + 1) % 3 === 0;

    const cellSize = containerWidth / 9;
    const cellStyle = [
      styles.cell,
      isMultipleThirdRow && styles.isMultipleThirdRowCell,
      isMultipleThirdCol && styles.isMultipleThirdColCell,
      isInitialBoardCell && value !== 0 && styles.staticCell,
      isWrongValueCell && value !== 0 && styles.wrongValueCell,
      isSelected && styles.selectedCell,
      { width: cellSize, height: cellSize },
    ];

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        disabled={isInitialBoardCell && value !== 0}
        style={cellStyle}
        onPress={() => handleCellPress(row, col)}
      >
        <Text style={styles.cellText}>{value || ""}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {board &&
        board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </View>
        ))}
      <View style={styles.numberPad}>
        <View style={styles.numberPadInner}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberPadButton}
              onPress={() => handleNumberPress(num)}
            >
              <Text style={styles.numberPadButtonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.numberPadInner}>
          <TouchableOpacity
            style={styles.numberPadClear}
            onPress={() => handleNumberPress(0)}
          >
            <Text style={styles.numberPadClearText}>{"Apagar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
  },
  cell: {
    boxSizing: "border-box",
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  isMultipleThirdRowCell: {
    borderTopWidth: 2,
  },
  isMultipleThirdColCell: {
    borderRightWidth: 2,
  },
  cellText: {
    fontSize: 20,
    fontWeight: 700,
  },
  selectedCell: {
    backgroundColor: "lightblue",
  },
  highlightedCell: {
    backgroundColor: "#F0F0F0",
  },
  staticCell: {
    backgroundColor: "#F0F0F0",
  },
  wrongValueCell: {
    backgroundColor: "#FFBABA",
  },
  topEdge: {
    borderTopWidth: 2,
  },
  bottomEdge: {
    borderBottomWidth: 2,
  },
  numberPad: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#E3F2FD",
    paddingVertical: 20,
  },
  numberPadInner: {
    flexDirection: "row",
    marginVertical: 6,
    justifyContent: "center",
  },
  numberPadButton: {
    width: cellSize * 0.9,
    height: cellSize * 0.9,
    marginHorizontal: 2,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0D47A1",
    shadowColor: "#0D47A1",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    borderBottomWidth: 3,
    borderBottomColor: "#0D47A1",
    borderRightWidth: 3,
    borderRightColor: "#0D47A1",
  },
  numberPadClear: {
    marginHorizontal: 2,
    marginTop: 8,
    paddingHorizontal: 4,
    paddingBottom: 4,
    paddingTop: 2,
    backgroundColor: "#DC143C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9B1C1C",
    shadowColor: "#9B1C1C",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    borderBottomWidth: 3,
    borderBottomColor: "#9B1C1C",
    borderRightWidth: 3,
    borderRightColor: "#9B1C1C",
    alignSelf: "flex-end",
  },
  numberPadClearText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  numberPadButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SudokuBoard;
