import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Use o IP real da sua rede ou 10.0.2.2 para emulador Android
    const apiUrl = 'http://192.168.3.66:5239/api/auth/login';
    console.log('Enviando login para:', apiUrl);

    try {
      const response = await axios.post(apiUrl, {
        email,
        senha,
      });

      console.log('Resposta da API:', response.data);

      const { token, usuario } = response.data;

      if (!token || !usuario?.id) {
        throw new Error('Token ou usuário inválido.');
      }

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user_id', usuario.id.toString());

      navigation.replace('Main');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error?.response?.data || error.message || error);

      if (error.response?.status === 401) {
        Alert.alert('Credenciais inválidas', 'Email ou senha incorretos.');
      } else if (error.response?.status === 404) {
        Alert.alert('Usuário não encontrado', 'Crie uma conta para continuar.');
      } else if (error.message?.includes('Network') || error.message?.includes('timeout')) {
        Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor.');
      } else {
        Alert.alert('Erro', 'Erro inesperado ao fazer login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#999' }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  registerText: { marginTop: 15, color: 'blue', textAlign: 'center' },
});

export default LoginScreen;
