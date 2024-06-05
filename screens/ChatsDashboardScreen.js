import React, { useEffect, useState } from 'react';
import { Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import { getCategories } from '../actions/getCategories';

const ChatsDashboardScreen = ({ route, navigation }) => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Retrieve data from params
  const { type } = route.params;

  useEffect(() => {
    async function loadCategories() {
      const columns = 'name, id'
      const fetchedCategories = await getCategories(columns);
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
            title={`Encontrar ${type === 'trabajador' ? '' : 'ofertas de '}${category.name}`}
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

export default ChatsDashboardScreen;
