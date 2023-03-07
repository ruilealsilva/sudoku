import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    paddingTop: 38,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  title: {
    color: '#333',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Header;
