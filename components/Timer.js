import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Timer = ({ isRunning, onTimeChange }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    onTimeChange(seconds);
  }, [seconds]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${padTime(minutes)}:${padTime(seconds)}`;
  };

  const padTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <View style={styles.timer}>
      <Text style={styles.time}>{formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  time: {
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default Timer;
