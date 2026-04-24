import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFavorites } from '../store/FavoritesContext';

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = (id, name) => {
    Alert.alert('Hapus', `Yakin hapus "${name}" dari favorit?`, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => removeFavorite(id),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image',
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>
          Rating: {item.rating?.average || 'N/A'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemove(item.id, item.name)}
      >
        <Text style={styles.removeText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Belum ada favorit.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 85,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 6,
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});