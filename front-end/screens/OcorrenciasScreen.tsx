import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import { Ocorrencia } from '../types/Ocorrencia';
import { useNavigation } from '@react-navigation/native';
import { carregarOcorrenciasLocalmente, salvarOcorrenciasLocalmente } from '../storage/ocorrenciasStorage';

const OcorrenciasScreen = () => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
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
      }
    };

    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesOcorrencia', { id: item.id })}>
            <View style={styles.card}>
              <Text style={styles.bairro}>{item.bairro}</Text>
              <Text>{item.tempoInterrupcao} min</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { backgroundColor: '#f2f2f2', padding: 15, marginVertical: 5, borderRadius: 8 },
  bairro: { fontWeight: 'bold', fontSize: 16 }
});

export default OcorrenciasScreen;
