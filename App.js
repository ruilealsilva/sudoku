import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Highscores, Home, Game } from "./pages";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Game"
          component={Game}
          options={{ headerTitle: "Sudoku" }}
        />
        <Stack.Screen
          name="Highscores"
          component={Highscores}
          options={{ headerTitle: "Highscores" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
