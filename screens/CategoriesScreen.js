import React, { useEffect, useState } from 'react';
import { Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import { getCategories } from '../actions/getCategories';

const CategoriesScreen = ({ route, navigation }) => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Retrieve data from params
  const { type } = route.params;

  useEffect(() => {
    async function loadCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    }
    loadCategories();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      {categories && categories.map((category, index) => (
        <View key={index}>
          <Text>{category.name}</Text>
          <Button
            title={`Encontrar ${category.name}`}
            onPress={() => {
              type === 'trabajador'
                ? navigation.navigate('Workers', { category: category.name })
                : navigation.navigate('Proposals', { category: category.name })
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoriesScreen;
