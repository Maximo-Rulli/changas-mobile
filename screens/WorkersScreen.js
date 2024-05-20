import React, {useEffect, useState} from 'react';
import {Text, View, Button } from 'react-native';
import { getCategories } from '../actions/getCategories';

const WorkersScreen = ({navigation}) => {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    async function loadCategories (){
      setCategories(await getCategories()); 
    }
    loadCategories();
  }, [])

  return (
    <View>
      <Text>Contratar</Text>
      {categories && categories.map((category, index) => (
        <View>
          <Text key={index}>{category.name}</Text>
          <Button
      title="Volver al inicio"
      onPress={() => navigation.navigate('Homew')}/>
        </View>
      ))}
    </View>
  );
};


export default WorkersScreen;
