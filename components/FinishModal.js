import React from "react";
import { StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native";

const FinishModal = ({ isVisible, time, onClose }) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${padTime(minutes)}:${padTime(seconds)}`;
  };

  const padTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <Text style={styles.title}>Parabéns!</Text>
          <Text style={styles.subtitle}>Tempo até à solução:</Text>
          <Text style={styles.time}>{formatTime(time)}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  time: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FinishModal;
