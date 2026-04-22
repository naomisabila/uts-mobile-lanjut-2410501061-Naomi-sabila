import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gagal memuat data: {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});