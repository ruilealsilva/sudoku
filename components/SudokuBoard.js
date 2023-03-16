import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const SudokuBoard = ({ board, onChange }) => {
  const [selectedCell, setSelectedCell] = useState(null);

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
    const isSelected =
      selectedCell && selectedCell.row === row && selectedCell.col === col;

    const isHighlighted =
      selectedCell &&
      ((selectedCell.row === row && selectedCell.col !== col) ||
        (selectedCell.row !== row && selectedCell.col === col));

    const cellStyle = [
      styles.cell,
      isSelected && styles.selectedCell,
      isHighlighted && styles.highlightedCell,
    ];

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 20,
  },
  selectedCell: {
    backgroundColor: "lightblue",
  },
  highlightedCell: {
    backgroundColor: "#F0F0F0",
  },
  numberPad: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  numberPadButton: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  numberPadButtonText: {
    fontSize: 20,
  },
});

export default SudokuBoard;
