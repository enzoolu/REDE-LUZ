import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'user_id';

/**
 * Salva o token JWT e o ID do usuário no AsyncStorage.
 */
export const saveToken = async (token: string, userId: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_ID_KEY, userId.toString());
    console.log('🔐 Token e userId salvos no AsyncStorage');
  } catch (error) {
    console.error('❌ Erro ao salvar token/userId:', error);
  }
};

/**
 * Retorna o token JWT salvo.
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('❌ Erro ao obter token:', error);
    return null;
  }
};

/**
 * Retorna o ID do usuário salvo como número.
 */
export const getUserId = async (): Promise<number | null> => {
  try {
    const id = await AsyncStorage.getItem(USER_ID_KEY);
    return id ? parseInt(id, 10) : null;
  } catch (error) {
    console.error('❌ Erro ao obter userId:', error);
    return null;
  }
};

/**
 * Remove o token e userId do AsyncStorage.
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_ID_KEY);
    console.log('🧹 AsyncStorage limpo');
  } catch (error) {
    console.error('❌ Erro ao limpar AsyncStorage:', error);
  }
};
