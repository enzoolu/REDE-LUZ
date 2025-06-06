import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CriarOcorrenciaScreen = ({ navigation }: any) => {
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [tempo, setTempo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async () => {
    if (!cep || !numero || !bairro || !cidade || !tempo || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('user_id'); // <-- padronizado
      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const now = new Date(Date.now() - 600000000);

      const payload = {
        cep,
        numero,
        bairro,
        cidade,
        prejuizos: descricao || 'Sem descrição',
        inicio: now.toISOString(),
        duracaoMinutos: parseInt(tempo),
        usuarioId: Number(userId),
      };

      await api.post('/ocorrencia', payload);

      Alert.alert('Sucesso', 'Ocorrência criada com sucesso!');

      // Redireciona para Main, garantindo atualização de abas
      navigation.replace('Main');

      // Limpa os campos
      setCep('');
      setNumero('');
      setBairro('');
      setCidade('');
      setTempo('');
      setDescricao('');
    } catch (error: any) {
      console.error('Erro ao criar ocorrência:', error?.response?.data || error.message);
      Alert.alert('Erro', 'Falha ao criar ocorrência.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={setCep} />
      <TextInput style={styles.input} placeholder="Número" value={numero} onChangeText={setNumero} />
      <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
      <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
      <TextInput
        style={styles.input}
        placeholder="Tempo de Interrupção (min)"
        keyboardType="numeric"
        value={tempo}
        onChangeText={setTempo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição dos danos"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Enviar Ocorrência" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default CriarOcorrenciaScreen;
