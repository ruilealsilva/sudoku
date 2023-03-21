import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const difficulties = [
  { level: "test", label: "Teste", color: "#BFE6FF" },
  { level: "easy", label: "Fácil", color: "#99ff99" },
  { level: "moderate", label: "Moderado", color: "#FFCC66" },
  { level: "hard", label: "Difícil", color: "#FF6666" },
];

const Home = () => {
  const navigation = useNavigation();

  const handleDifficultySelect = (difficulty) => {
    navigation.navigate("Game", { difficulty });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione uma dificuldade:</Text>
      <View style={styles.buttonContainer}>
        {difficulties.map(({ level, label, color }) => (
          <TouchableOpacity
            key={level}
            style={[styles.button, { backgroundColor: color }]}
            onPress={() => handleDifficultySelect(level)}
          >
            <Text style={styles.buttonText}>{label.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 5,
    minWidth: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;