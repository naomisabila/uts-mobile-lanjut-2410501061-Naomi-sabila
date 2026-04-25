import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { fetchSearchShows } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
  const navigation = useNavigation();

  const validate = () => {
    if (!query.trim()) {
      setValidationError('Input tidak boleh kosong');
      return false;
    }
    if (query.trim().length < 3) {
      setValidationError('Minimal 3 karakter');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSearch = async () => {
    if (!validate()) return;
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const shows = await fetchSearchShows(query.trim());
      if (shows.length === 0) {
        setError('Tidak ada hasil ditemukan');
      }
      setResults(shows);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { showId: item.id })}
    >
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cari show..."
        value={query}
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleSearch}
      />
      {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
        <Text style={styles.buttonText}>Cari</Text>
      </TouchableOpacity>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  validationError: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2E86AB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
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
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
});