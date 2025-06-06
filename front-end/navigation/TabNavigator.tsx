import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MinhasOcorrenciasScreen from '../screens/MinhasOcorrenciasScreen';
import OcorrenciasScreen from '../screens/OcorrenciasScreen';
import CriarOcorrenciaScreen from '../screens/CriarOcorrenciaScreen';
import RecomendacoesScreen from '../screens/RecomendacoesScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MinhasOcorrencias"
        component={MinhasOcorrenciasScreen}
        options={{ title: 'Minhas Ocorrências' }}
      />
      <Tab.Screen
        name="Ocorrencias"
        component={OcorrenciasScreen}
        options={{ title: 'Todas Ocorrências' }}
      />
      <Tab.Screen
        name="CriarOcorrencia"
        component={CriarOcorrenciaScreen}
        options={{ title: 'Nova Ocorrência' }}
      />
      <Tab.Screen
        name="Recomendacoes"
        component={RecomendacoesScreen}
        options={{ title: 'Recomendações' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
