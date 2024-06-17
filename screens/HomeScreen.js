import React from 'react'
import {Text, View, Button, StyleSheet } from 'react-native'
import useFetchUser from '../hooks/useFetchUser'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const HomeScreen = ({navigation}) => {
  const {username} = useFetchUser()

  return (
    <SafeAreaProvider>
      <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>  Bienvenido a Changas {username}!</Text>
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
