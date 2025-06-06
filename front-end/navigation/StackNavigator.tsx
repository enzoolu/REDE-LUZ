import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import DetalhesOcorrenciaScreen from '../screens/DetalhesOcorrenciaScreen';
import CriarOcorrenciaScreen from '../screens/CriarOcorrenciaScreen';
import MinhasOcorrenciasScreen from '../screens/MinhasOcorrenciasScreen';
import OcorrenciasScreen from '../screens/OcorrenciasScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  DetalhesOcorrencia: { id: number };
  MinhasOcorrencias: undefined;
  CriarOcorrencia: undefined;
  Ocorrencias: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar Conta' }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="DetalhesOcorrencia" component={DetalhesOcorrenciaScreen} options={{ title: 'Detalhes da Ocorrência' }} />
      <Stack.Screen name="CriarOcorrencia" component={CriarOcorrenciaScreen} options={{ title: 'Nova Ocorrência' }} />
      <Stack.Screen name="MinhasOcorrencias" component={MinhasOcorrenciasScreen} options={{ title: 'Minhas Ocorrências' }} />
      <Stack.Screen name="Ocorrencias" component={OcorrenciasScreen} options={{ title: 'Ocorrências Recentes' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
