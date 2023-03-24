export default function findArrayDifferences(arr1, arr2) {
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
