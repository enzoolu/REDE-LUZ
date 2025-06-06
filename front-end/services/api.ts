import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.3.66:5239/api',
});

// Interceptador para adicionar o token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔐 Token inserido no header:', token);
  } else {
    console.warn('⚠️ Nenhum token encontrado no AsyncStorage');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
