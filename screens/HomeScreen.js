import React from 'react'
import {Text, View, Button, StyleSheet } from 'react-native'
import useFetchUser from '../hooks/useFetchUser'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'

const HomeScreen = ({navigation}) => {
  const {username} = useFetchUser()
  /*const [fontsLoaded, fontError] = useFonts({
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  })
  if (!fontsLoaded || !fontError){
    return null
  }*/
  return (
    <SafeAreaProvider>
      <Text>  Bienvenido a Changas {username}!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Encontrar trabajo" onPress={() => {navigation.navigate('ProposalsRoot', { screen: 'ProposalsCategories' })}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Encontrar proveedor" onPress={() => {navigation.navigate('WorkersRoot', { screen: 'WorkersCategories' })}} />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
})

export default HomeScreen
