import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const RecomendacoesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dicas em caso de falta de energia:</Text>
      <Text style={styles.tip}>• Mantenha lanternas e baterias carregadas por perto.</Text>
      <Text style={styles.tip}>• Evite abrir a geladeira para conservar os alimentos.</Text>
      <Text style={styles.tip}>• Desligue aparelhos eletrônicos para evitar sobrecarga.</Text>
      <Text style={styles.tip}>• Tenha água armazenada para emergências.</Text>
      <Text style={styles.tip}>• Tenha um carregador portátil para o celular.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  tip: { fontSize: 16, marginVertical: 5 }
});

export default RecomendacoesScreen;
