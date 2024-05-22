import React, {useEffect, useState} from 'react';
import {Text, View, Button } from 'react-native';
import { getWorkers } from '../actions/getWorkers';

const WorkersScreen = ({route, navigation}) => {
  const [workers, setWorkers] = useState(null)
  // Retrieve data from params
  const {category} = route.params
  navigation.setParams({
    category: category,
  });

  useEffect(() => {
    async function loadWorkers (){
      setWorkers(await getWorkers(category)); 
    }
    loadWorkers();
  }, [])

  return (
    <View>
      <Text>Contratar</Text>
      {workers && workers.map((worker, index) => (
        <View key={index}>
          <Text>Nombre: {worker.name}</Text>
          <Text>Cotización: {worker.hourly_price}</Text>
        </View>
      ))}
    </View>
  );
};


export default WorkersScreen;
