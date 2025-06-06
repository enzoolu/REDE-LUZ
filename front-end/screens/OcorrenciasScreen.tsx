import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../services/api';
import { Ocorrencia } from '../types/Ocorrencia';
import { useNavigation } from '@react-navigation/native';

const OcorrenciasScreen = () => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/ocorrencia');
        setOcorrencias(response.data);
      } catch (error) {
        console.error('Erro ao carregar ocorrências:', error);
        Alert.alert('Erro', 'Falha ao carregar ocorrências.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;
  }

  if (ocorrencias.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma ocorrência encontrada.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('DetalhesOcorrencia', { id: item.id })}
          >
            <Text style={styles.title}>{item.cidade} - {item.bairro}</Text>
            <Text>{item.tempoInterrupcao} minutos</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  title: { fontWeight: 'bold' },
});

export default OcorrenciasScreen;
