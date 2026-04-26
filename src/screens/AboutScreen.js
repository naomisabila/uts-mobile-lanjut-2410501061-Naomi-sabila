import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Naomi Sabila Imani</Text>
        <Text style={styles.nim}>NIM: 2410501061</Text>
        <Text style={styles.kelas}>Kelas: D3 Sistem Informasi A</Text>
        <Text style={styles.tema}>Tema: MovieDex (Tema B)</Text>
        <Text style={styles.credit}>API: TVMaze (https://api.tvmaze.com)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '100%',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nim: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  kelas: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  tema: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  credit: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});