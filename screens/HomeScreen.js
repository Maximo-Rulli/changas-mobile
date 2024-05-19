import React, {useEffect, useState} from 'react';
import {Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = () => {
  const [username, setUsername] = useState('')
  useEffect(() => {
    async function getUsername (){
      setUsername(await SecureStore.getItemAsync('username'));
      console.log(username)
    }
    getUsername();
  }, [])

  return (
    <View>
      <Text>Bienvenido a Changas {username}!</Text>
    </View>
  );
};

export default HomeScreen;