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
      const fetchedWorkers = await getWorkers(category);
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
      {workers && workers.map((worker) => (
        <View key={worker.id_worker}>
          <Text>Nombre: {worker.username}</Text> 
          <Text>Cotización: {worker.hourly_price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default WorkersScreen;
