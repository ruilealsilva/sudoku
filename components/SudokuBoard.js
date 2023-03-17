import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

const SudokuBoard = ({
  board,
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
    const isSelected =
      selectedCell && selectedCell.row === row && selectedCell.col === col;

    const isHighlighted =
      selectedCell &&
      ((selectedCell.row === row && selectedCell.col !== col) ||
        (selectedCell.row !== row && selectedCell.col === col));

    const isMultipleThirdRow = row % 3 === 0;
    const isMultipleThirdCol = (col + 1) % 3 === 0;

    const containerWidth = Dimensions.get("window").width * 0.9;
    const cellSize = containerWidth / 9;
    const cellStyle = [
      styles.cell,
      isSelected && styles.selectedCell,
      isHighlighted && styles.highlightedCell,
      isMultipleThirdRow && styles.isMultipleThirdRowCell,
      isMultipleThirdCol && styles.isMultipleThirdColCell,
      { width: cellSize, height: cellSize },
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
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
  },
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
  },
  selectedCell: {
    backgroundColor: "lightblue",
  },
  highlightedCell: {
    backgroundColor: "#F0F0F0",
  },
  topEdge: {
    borderTopWidth: 2,
  },
  // leftEdge: {
  //   borderLeftWidth: 2,
  // },
  // rightEdge: {
  //   borderRightWidth: 2,
  // },
  bottomEdge: {
    borderBottomWidth: 2,
  },

  numberPad: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  numberPadButton: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    borderBottomWidth: 2,
    borderBottomColor: "#B2B2B2",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
  },
  numberPadButtonText: {
    fontSize: 20,
  },
});

export default SudokuBoard;
