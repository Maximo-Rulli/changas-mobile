import React from 'react'
import {Text, View, Button, StyleSheet } from 'react-native'

const WelcomeScreen = ({navigation}) => {

  return (
    <View>
      <Text>  Bienvenido a Changas {username}!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Encontrar trabajo" onPress={() => {navigation.navigate('ProposalsRoot', { screen: 'ProposalsCategories' })}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Encontrar proveedor" onPress={() => {navigation.navigate('WorkersRoot', { screen: 'WorkersCategories' })}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
})

export default WelcomeScreen
