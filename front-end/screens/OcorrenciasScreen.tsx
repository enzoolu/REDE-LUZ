import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { Ocorrencia } from '../types/Ocorrencia';
import { useNavigation } from '@react-navigation/native';
import { carregarOcorrenciasLocalmente, salvarOcorrenciasLocalmente } from '../storage/ocorrenciasStorage';

const OcorrenciasScreen = () => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const carregarDados = async () => {
      const locais = await carregarOcorrenciasLocalmente();
      setOcorrencias(locais);

      try {
        const response = await api.get('/ocorrencia');
        setOcorrencias(response.data);
        await salvarOcorrenciasLocalmente(response.data);
      } catch (error) {
        console.warn('Erro ao buscar da API. Usando dados locais.', error);
        Alert.alert('Atenção', 'Não foi possível atualizar dados. Usando dados armazenados.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
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
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesOcorrencia', { id: item.id })}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.cidade} - {item.bairro}</Text>
              <Text>{item.tempoInterrupcao} minutos</Text>
            </View>
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
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
});

export default OcorrenciasScreen;
