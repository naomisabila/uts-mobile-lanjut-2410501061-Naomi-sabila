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

export default function DetailScreen({ route, navigation }) {
  const { showId } = route.params; // ambil ID dari params
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAddToFavorite = () => {
    // Untuk sementara hanya alert, nanti disambungin ke state management
    Alert.alert('Info', 'Fitur favorit akan datang di hari ke-5!');
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!show) {
    return null; // safety
  }

  return (
    <ScrollView style={styles.container}>
      {/* Poster */}
      <Image
        source={{
          uri: show.image?.original || 'https://via.placeholder.com/300x450?text=No+Image',
        }}
        style={styles.poster}
        resizeMode="contain"
      />

      {/* Nama Show */}
      <Text style={styles.title}>{show.name}</Text>

      {/* Rating */}
      <Text style={styles.info}>
        ⭐ Rating: {show.rating?.average || 'N/A'} / 10
      </Text>

      {/* Genre */}
      <Text style={styles.info}>
        🎭 Genre: {show.genres?.join(', ') || 'Tidak diketahui'}
      </Text>

      {/* Jadwal Tayang */}
      <Text style={styles.info}>
        📅 Schedule:{' '}
        {show.schedule?.days?.join(', ') || '-'} pukul {show.schedule?.time || '??:??'}
      </Text>

      {/* Status */}
      <Text style={styles.info}>
        📌 Status: {show.status || '-'}
      </Text>

      {/* Ringkasan */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Ringkasan:</Text>
        <Text style={styles.summary}>
          {show.summary?.replace(/<[^>]*>/g, '') || 'Tidak ada ringkasan.'}
        </Text>
      </View>

      {/* Tombol Tambah ke Favorit */}
      <TouchableOpacity style={styles.favoriteButton} onPress={handleAddToFavorite}>
        <Text style={styles.favoriteButtonText}>❤️ Tambah ke Favorit</Text>
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
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});