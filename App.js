import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import WorkersScreen from './screens/WorkersScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ProposalsScreen from './screens/ProposalsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import RegisterScreen from './screens/RegisterScreen';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function WorkersRoot() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkersCategories"
        component={CategoriesScreen}
        initialParams={{ type: 'trabajador' }}
        options={{title: 'Encontrar trabajador'}}
        />
        <Stack.Screen
        name="Workers"
        component={WorkersScreen}
        initialParams={{ category: null }}
        options={({ route }) => ({ title: `Buscando ${route.params.category}` })}
        />
    </Stack.Navigator>
  );
}

function ProposalsRoot() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProposalsCategories"
        component={CategoriesScreen}
        initialParams={{ type: 'propuesta' }}
        options={{title: 'Encontrar trabajo'}}
        />
        <Stack.Screen
        name="Proposals"
        component={ProposalsScreen}
        initialParams={{ category: null }}
        options={({ route }) => ({ title: `Ofertas de ${route.params.category}` })}
        />
    </Stack.Navigator>
  );
}

function ProfileRoot({route}) {
  const {id_user} = route.params
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Perfil'}}
        />
        <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        initialParams={{ category: null, id_user}}
        options={({ route }) => ({ title: `Reseñas de ${route.params.category}` })}
        />
    </Stack.Navigator>
  );
}

function TabNavigator({route}) {
  const {id_user, username} = route.params
  return (
    <Tab.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Bienvenido'}}
      />
      <Tab.Screen
        name="WorkersRoot"
        component={WorkersRoot}
        options={{ title: 'Trabajadores', headerShown: false}}
      />
      <Tab.Screen
        name="ProposalsRoot"
        component={ProposalsRoot}
        options={{title: 'Ofertas', headerShown: false}}
      />
      <Tab.Screen
        name="ProfileRoot"
        component={ProfileRoot}
        initialParams={{id_user}}
        options={{title: 'Perfil', headerShown: false}}
      />
    </Tab.Navigator>
  );
}


function DefaultStack(username, id_user) {
  return (
    <Stack.Navigator>
      {username && id_user ? //If the user is not logged in, its data aren't present
        <Stack.Screen
          name="DefaultLogged"
          component={TabNavigator}
          initialParams={{id_user, username}}
          options={{headerShown: false}}
        />  
        : 
        <Stack.Screen
          name="DefaultLogin"
          component={LoginScreen}
          options={{title: 'Inicie sesión'}}
        />
      }
      <Stack.Screen
        name="Logged"
        component={TabNavigator}
        initialParams={{id_user:null, username:null}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Inicie sesión'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Registrarse'}}
      />
    </Stack.Navigator>
  );
}

const App = () => {
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
      {DefaultStack(username, id_user)}
    </NavigationContainer>
  );
};

export default App;