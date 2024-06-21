import React, { useEffect, useState } from 'react'
import { 
  Text,
  View,
  SafeAreaView, 
  ActivityIndicator, 
  TouchableOpacity, 
  FlatList,
  StyleSheet
} from 'react-native'
import { getCategories } from '../actions/getCategories'
import CategorySvg from '../components/CategorySvg'
import nameShortener from '../utils/nameShortener'

const Item = ({ category, type, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        type === 'trabajador'
          ? navigation.navigate('Workers', { category: category.name })
          : navigation.navigate('Proposals', { category: category.name })
      }}>
      <View style={styles.iconContainer}>
        <CategorySvg id={category.id} width={40} height={40} />
      </View>
      <Text style={styles.itemText}>{nameShortener(category.name)}</Text>
    </TouchableOpacity>
  )
}

const CategoriesScreen = ({ route, navigation }) => {
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)

  // Retrieve data from params
  const { type } = route.params

  useEffect(() => {
    async function loadCategories() {
      const columns = 'name, id';
      const fetchedCategories = await getCategories(columns)
      setCategories(fetchedCategories)
      setLoading(false)
    }
    loadCategories()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <SafeAreaView>
      {categories && 
        <FlatList
          data={categories}
          renderItem={({ item }) => <Item category={item} type={type} navigation={navigation} />}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.grid}
        />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  grid: {
    justifyContent: 'center',
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemText: {
    textAlign: 'center',
  },
})

export default CategoriesScreen
