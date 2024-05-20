import React, {useEffect, useState} from 'react';
import {Text, View, Button } from 'react-native';
import { getCategories } from '../actions/getCategories';

const ProposalsScreen = ({navigation}) => {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    async function loadCategories (){
      setCategories(await getCategories()); 
    }
    loadCategories();
  }, [])

  return (
    <View>
      <Text>Encontrar trabajo</Text>
      {categories && categories.map((category, index) => (
        <Text key={index}>{category.name}</Text>
      ))}
    </View>
  );
};


export default ProposalsScreen;
