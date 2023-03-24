import AsyncStorage from "@react-native-async-storage/async-storage";

const setHighScore = async (difficulty, time) => {
  try {
    const storedHighScore = await AsyncStorage.getItem(
      `highscore-${difficulty}`
    );
    if (storedHighScore !== null) {
      const prevHighScore = parseInt(storedHighScore);
      if (time <= prevHighScore) {
        await AsyncStorage.setItem(`highscore-${difficulty}`, time.toString());
      }
    } else {
      await AsyncStorage.setItem(`highscore-${difficulty}`, time.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

export default setHighScore;
