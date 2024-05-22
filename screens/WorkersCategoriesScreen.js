import React, {useEffect, useState} from 'react';
import {Text, View, Button } from 'react-native';
import { getCategories } from '../actions/getCategories';

const WorkersCategoriesScreen = ({navigation}) => {
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
        <View key={index}>
          <Text>{category.name}</Text>
          <Button
      title={`Encontrar ${category.name}`}
      onPress={() => navigation.navigate('Workers', {category: category.name})}/>
        </View>
      ))}
    </View>
  );
};


export default WorkersCategoriesScreen;
