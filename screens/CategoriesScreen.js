import React, {useEffect, useState} from 'react';
import {Text, View, Button, ScrollView } from 'react-native';
import { getCategories } from '../actions/getCategories';

const CategoriesScreen = ({route, navigation}) => {
  const [categories, setCategories] = useState(null)
  // Retrieve data from params
  const {type} = route.params
  console.log(type)
  useEffect(() => {
    async function loadCategories (){
      setCategories(await getCategories()); 
    }
    loadCategories();
  }, [])

  return (
    <ScrollView>
      {categories && categories.map((category, index) => (
        <View key={index}>
          <Text>{category.name}</Text>
          <Button
      title={`Encontrar ${category.name}`}
      onPress={() => {type === 'trabajador' ? navigation.navigate('Workers', {category: category.name})
    : navigation.navigate('Proposals', {category: category.name})}}/>
        </View>
      ))}
    </ScrollView>
  );
};


export default CategoriesScreen;
