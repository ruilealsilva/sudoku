import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Highscores = () => {
  const [testHighscore, setTestHighscore] = useState(null);
  const [easyHighscore, setEasyHighscore] = useState(null);
  const [normalHighscore, setNormalHighscore] = useState(null);
  const [hardHighscore, setHardHighscore] = useState(null);

  useEffect(() => {
    // Fetch the highscores from local storage
    AsyncStorage.multiGet([
      "highscore-test",
      "highscore-easy",
      "highscore-normal",
      "highscore-hard",
    ]).then((highscores) => {
      const parsedHighscores = highscores.reduce((acc, [key, value]) => {
        const difficulty = key.split("-")[1];
        return { ...acc, [difficulty]: value || "-" };
      }, {});
      setTestHighscore(parsedHighscores.test);
      setEasyHighscore(parsedHighscores.easy);
      setNormalHighscore(parsedHighscores.normal);
      setHardHighscore(parsedHighscores.hard);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recordes</Text>
      <View style={styles.highscore}>
        <Text style={styles.difficulty}>Teste</Text>
        <Text style={styles.time}>{testHighscore || "-"}</Text>
      </View>
      <View style={styles.highscore}>
        <Text style={styles.difficulty}>Fácil</Text>
        <Text style={styles.time}>{easyHighscore || "-"}</Text>
      </View>
      <View style={styles.highscore}>
        <Text style={styles.difficulty}>Moderado</Text>
        <Text style={styles.time}>{normalHighscore || "-"}</Text>
      </View>
      <View style={styles.highscore}>
        <Text style={styles.difficulty}>Difícil</Text>
        <Text style={styles.time}>{hardHighscore || "-"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  highscore: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  difficulty: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 20,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Highscores;
