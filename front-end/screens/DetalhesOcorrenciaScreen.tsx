import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import axios from 'axios';
import { Ocorrencia } from '../types/Ocorrencia';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

type OcorrenciaRouteProp = RouteProp<RootStackParamList, 'DetalhesOcorrencia'>;

const DetalhesOcorrenciaScreen = () => {
  const route = useRoute<OcorrenciaRouteProp>();
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [endereco, setEndereco] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/ocorrencia/${route.params.id}`);
        const dadosOcorrencia = response.data;
        setOcorrencia(dadosOcorrencia);

        if (dadosOcorrencia.cep) {
          try {
            const viaCep = await axios.get(`https://viacep.com.br/ws/${dadosOcorrencia.cep}/json/`);
            const { logradouro, bairro, localidade, uf } = viaCep.data;
            setEndereco(`${logradouro || 'Logradouro não disponível'}, ${bairro || 'Bairro não disponível'} - ${localidade}/${uf}`);
          } catch {
            setEndereco('Endereço não localizado (ViaCEP indisponível)');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados da ocorrência.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route.params.id]);

  if (loading || !ocorrencia) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {ocorrencia.bairro || 'Sem bairro'}, {ocorrencia.cidade || 'Sem cidade'}
      </Text>
      <Text>CEP: {ocorrencia.cep || 'Não informado'}</Text>
      {endereco && <Text>Endereço: {endereco}</Text>}
      <Text>Número: {ocorrencia.numero || 'Não informado'}</Text>
      <Text>Duração: {ocorrencia.tempoInterrupcao} minutos</Text>
      <Text>Descrição: {ocorrencia.descricao || 'Sem descrição'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  loading: { padding: 20, fontSize: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});

export default DetalhesOcorrenciaScreen;
