import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ListRenderItem,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { Ocorrencia } from '../types/Ocorrencia';
import { useFocusEffect, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

export default function MinhasOcorrenciasScreen() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id'); // corrigido

      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const response = await api.get<Ocorrencia[]>(`/ocorrencia/usuario/${userId}`);
      setOcorrencias(response.data);
    } catch (error: any) {
      console.error('❌ Erro ao carregar ocorrências:', error?.response?.data || error.message);
      Alert.alert('Erro', 'Falha ao carregar ocorrências.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchData();
    }, []) // removido o `route`
  );

  const renderItem: ListRenderItem<Ocorrencia> = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetalhesOcorrencia', { id: item.id })}
    >
      <Text style={styles.title}>{item.cidade} - {item.bairro}</Text>
      <Text>{item.tempoInterrupcao} minutos</Text>
    </TouchableOpacity>
  );

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
        renderItem={renderItem}
      />
    </View>
  );
}

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
