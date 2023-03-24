import AsyncStorage from "@react-native-async-storage/async-storage";

export const setHighScore = async (difficulty, time) => {
  try {
    const storedHighScore = await AsyncStorage.getItem(
      `highscore-${difficulty}`
    );
    if (storedHighScore !== null) {
      const prevHighScore = parseInt(storedHighScore);
      if (time < prevHighScore) {
        console.log(`New high score for ${difficulty} difficulty: ${time}`);
        await AsyncStorage.setItem(`highscore-${difficulty}`, time.toString());
      }
    } else {
      console.log(`New high score for ${difficulty} difficulty: ${time}`);
      await AsyncStorage.setItem(`highscore-${difficulty}`, time.toString());
    }
  } catch (error) {
    console.log(error);
  }
};
