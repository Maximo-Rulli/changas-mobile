import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Logout from '../actions/logout';

const HomeScreen = ({navigation}) => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    async function checkUser (){
      try {
        setUsername(await SecureStore.getItemAsync('username'));
      }
      catch (e) {
        Alert.alert('Error', 'Error al recuperar el nombre de usuario');
      }
    }
    checkUser();
  }, [])

  return (
    <View>
      <Text>  Bienvenido a Changas {username}!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={() => Logout({navigation})} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Encontrar trabajo" onPress={() => {navigation.navigate('ProposalsRoot', { screen: 'ProposalsCategories' })}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Encontrar proveedor" onPress={() => {navigation.navigate('WorkersRoot', { screen: 'WorkersCategories' })}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
});

export default HomeScreen;
