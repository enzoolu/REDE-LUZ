import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ocorrencia } from '../types/Ocorrencia';

const STORAGE_KEY = 'ocorrencias_local';

export const salvarOcorrenciasLocalmente = async (ocorrencias: Ocorrencia[]) => {
  try {
    const json = JSON.stringify(ocorrencias);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error('Erro ao salvar ocorrências localmente', error);
  }
};

export const carregarOcorrenciasLocalmente = async (): Promise<Ocorrencia[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao carregar ocorrências locais', error);
    return [];
  }
};
