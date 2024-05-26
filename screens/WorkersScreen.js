import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { getWorkers } from '../actions/getWorkers';

const WorkersScreen = ({ route }) => {
  const [workers, setWorkers] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Retrieve data from params
  const { category } = route.params;

  useEffect(() => {
    async function loadWorkers() {
      const columns = 'username, hourly_price, location, score, employees, description, attention_hours'
      const fetchedWorkers = await getWorkers(category, columns);
      setWorkers(fetchedWorkers);
      setLoading(false);
    }
    loadWorkers();
  }, [category]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      {workers && workers.map((worker, index) => (
        <View key={index}>
          <Text>Nombre: {worker.username}</Text> 
          <Text>Cotización: ${worker.hourly_price}/h</Text> 
          <Text>Ubicación: {worker.location}</Text>
          <Text>N° de empleados: {worker.employees}</Text>
          <Text>Horas de atención: {worker.attention_hours}</Text>
          <Text>Descripción: {worker.description}</Text>
          <Text>Puntaje: {worker.score}/5</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default WorkersScreen;
