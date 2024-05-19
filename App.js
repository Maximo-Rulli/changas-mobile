import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const [username, setUsername] = useState(null)
  const [id_user, setId_user] = useState(null)

  useEffect(() => {
    async function getData (){
      setUsername(await SecureStore.getItemAsync('username'));
      setId_user(await SecureStore.getItemAsync('id_user'));
    }
    getData();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {username && id_user ? //If the user is not logged in its data aren't present
        <Stack.Screen
        name="LoggedHome"
        component={HomeScreen}
        options={{title: 'Bienvenido'}}/>  
        : 
        <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Inicie sesión'}}/>
        }
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Bienvenido'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;