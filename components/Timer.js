import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Timer = ({ isRunning, onTimeChange }) => {
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isRunning) {
      setTimerId(
        setInterval(() => {
          setSeconds((seconds) => seconds + 1);
        }, 1000)
      );
      setIsPaused(false);
    } else {
      clearInterval(timerId);
    }
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

  const handlePauseResume = () => {
    if (!isPaused) {
      setIsPaused(true);
      clearInterval(timerId);
    } else {
      setIsPaused(false);
      setTimerId(
        setInterval(() => {
          setSeconds((seconds) => seconds + 1);
        }, 1000)
      );
    }
  };

  return (
    <View style={styles.timer}>
      <Text style={styles.time}>{formatTime(seconds)}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePauseResume}>
        <Text style={styles.buttonText}>
          {isPaused ? "Recomeçar" : "Pausar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
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
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
  },
  buttonText: {
    color: "grey",
    fontSize: 18,
  },
});

export default Timer;
