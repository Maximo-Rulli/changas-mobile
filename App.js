import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import WorkersScreen from './screens/WorkersScreen';
import ProposalsScreen from './screens/ProposalsScreen';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

function WorkersRoot() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkersCategories"
        component={WorkersScreen}
        options={{title: 'Encuentre un trabajador'}}/>

      <Stack.Navigator>
        <Stack.Screen
          name="Homew"
          component={HomeScreen}
          options={{title: 'Bienvenido otra vez'}}/>
      </Stack.Navigator>

    </Stack.Navigator>
  );
}


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
        name="DefaultHome"
        component={HomeScreen}
        options={{title: 'Bienvenido'}}/>  
        : 
        <Stack.Screen
        name="DefaultLogin"
        component={LoginScreen}
        options={{title: 'Inicie sesión'}}/>
        }
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Bienvenido'}}
        />
        <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Inicie sesión'}}
        />
        <Stack.Screen
          name="WorkersRoot"
          component={WorkersRoot}
          options={{ title: 'Encuentre un trabajador' }}
        />
        <Stack.Screen
        name="ProposalsScreen"
        component={ProposalsScreen}
        options={{title: 'Encuentre una oferta laboral'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;