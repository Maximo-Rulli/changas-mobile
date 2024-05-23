import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView } from 'react-native';
import { getWorkers } from '../actions/getWorkers';

const WorkersScreen = ({route}) => {
  const [workers, setWorkers] = useState(null)
  // Retrieve data from params
  const {category} = route.params

  useEffect(() => {
    async function loadWorkers (){
      setWorkers(await getWorkers(category)); 
    }
    loadWorkers();
  }, [])

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
