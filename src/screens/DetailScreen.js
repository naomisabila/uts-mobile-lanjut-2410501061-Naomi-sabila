import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { fetchShowDetail } from '../services/api';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { useFavorites } from '../store/FavoritesContext';

export default function DetailScreen({ route, navigation }) {
  const { showId } = route.params;
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((item) => item.id === show?.id);

  const loadDetail = async () => {
    try {
      setError(null);
      const data = await fetchShowDetail(showId);
      setShow(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [showId]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(show.id);
      Alert.alert('Berhasil', 'Dihapus dari favorit');
    } else {
      addFavorite(show);
      Alert.alert('Berhasil', 'Ditambahkan ke favorit!');
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!show) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: show.image?.original || 'https://via.placeholder.com/300x450?text=No+Image',
        }}
        style={styles.poster}
        resizeMode="contain"
      />

      <Text style={styles.title}>{show.name}</Text>

      <Text style={styles.info}>
        ⭐ Rating: {show.rating?.average || 'N/A'} / 10
      </Text>

      <Text style={styles.info}>
        🎭 Genre: {show.genres?.join(', ') || 'Tidak diketahui'}
      </Text>

      <Text style={styles.info}>
        📅 Schedule:{' '}
        {show.schedule?.days?.join(', ') || '-'} pukul {show.schedule?.time || '??:??'}
      </Text>

      <Text style={styles.info}>
        📌 Status: {show.status || '-'}
      </Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Ringkasan:</Text>
        <Text style={styles.summary}>
          {show.summary?.replace(/<[^>]*>/g, '') || 'Tidak ada ringkasan.'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        onPress={handleToggleFavorite}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? '❤️ Hapus dari Favorit' : '🤍 Tambah ke Favorit'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  summaryContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  summary: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
  },
  favoriteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    elevation: 3,
  },
  favoriteButtonActive: {
    backgroundColor: '#aaa',
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});