// React functionality imports
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens imports
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import WorkersScreen from './screens/WorkersScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import ProposalsScreen from './screens/ProposalsScreen'
import ProfileScreen from './screens/ProfileScreen'
import ReviewsScreen from './screens/ReviewsScreen'
import RegisterScreen from './screens/RegisterScreen'
import ChatsDashboardScreen from './screens/ChatsDashboardScreen'
import WorkersFormScreen from './screens/WorkersFormScreen'
import ProposalsFormScreen from './screens/ProposalsFormScreen'

// Miscelaneous imports
import * as SecureStore from 'expo-secure-store'
import UserIcon from './assets/icons/Usuario.svg'

// Create the Stack and Tab navigators
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


function WorkersRoot() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#308E45',
      }
    }}>
      <Stack.Screen
        name="WorkersCategories"
        component={CategoriesScreen}
        initialParams={{ type: 'trabajador' }}
        options={{title: 'Encontrar trabajador' }}
        />
        <Stack.Screen
        name="Workers"
        component={WorkersScreen}
        initialParams={{ category: null }}
        options={({ route }) => ({ title: `Buscando ${route.params.category}`})}
        />
    </Stack.Navigator>
  )
}


function ProposalsRoot() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#308E45',
      }
    }}>
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
        options={({ route }) => ({ title: `Ofertas de ${route.params.category}`})}
        />
    </Stack.Navigator>
  )
}


function ProfileRoot({route}) {
  const {IdUser, username} = route.params
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#308E45',
      }
    }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Perfil'}}
        />
        <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        initialParams={{ category: null, IdUser}}
        options={({ route }) => ({ title: `Reseñas de ${route.params.category}` })}
        />
        <Stack.Screen
        name="ProposalsForm"
        initialParams={{IdUser, username}}
        component={ProposalsFormScreen}
        options={{title: 'Subir oferta laboral'}}
        />
        <Stack.Screen
        name="WorkersForm"
        initialParams={{IdUser, username}}
        component={WorkersFormScreen}
        options={{title: 'Subir oficio'}}
        />
    </Stack.Navigator>
  )
}


function ChatsRoot() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#308E45',
      }
    }}>
      <Stack.Screen
        name="ChatsDashboard"
        component={ChatsDashboardScreen}
        options={{title: 'Chats'}}
        />
        <Stack.Screen
        name="Chat"
        component={WorkersScreen}
        initialParams={{ category: null }}
        options={({ route }) => ({ title: `Buscando ${route.params.category}`})}
        />
    </Stack.Navigator>
  )
}



function TabNavigator({route}) {
  const {IdUser, username} = route.params
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: () => {
        if (route.name === 'ProfileRoot'){
          return <UserIcon width={30} height={30}/>
        }
        
      }, headerStyle: {backgroundColor: '#308E45'}
    })}>
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
        name="ChatsRoot"
        component={ChatsRoot}
        options={{title: 'Chats', headerShown: false}}
      />
      <Tab.Screen
        name="ProfileRoot"
        component={ProfileRoot}
        initialParams={{IdUser, username}}
        options={{title: 'Perfil', headerShown: false}}
      />
    </Tab.Navigator>
  )
}



function DefaultStack(username, IdUser) {
  return (
    <Stack.Navigator>
      {username && IdUser ? //If the user is not logged in, its data aren't present
        <Stack.Screen
          name="DefaultLogged"
          component={TabNavigator}
          initialParams={{IdUser, username}}
          options={{headerShown: false}}
        />  
        : 
        <Stack.Screen
          name="DefaultLogin"
          component={LoginScreen}
          options={{title: 'Inicie sesión', headerStyle: {backgroundColor: '#308E45'} }}
        />
      }
      <Stack.Screen
        name="Logged"
        component={TabNavigator}
        initialParams={{IdUser:null, username:null}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Inicie sesión', headerStyle: {backgroundColor: '#308E45'}}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Registrarse', headerStyle: {backgroundColor: '#308E45'}}}
      />
    </Stack.Navigator>
  )
}



const App = () => {
  const [username, setUsername] = useState(null)
  const [IdUser, setIdUser] = useState(null)

  useEffect(() => {
    async function getData (){
      setUsername(await SecureStore.getItemAsync('username'))
      setIdUser(await SecureStore.getItemAsync('id_user'))
    }
    getData()
  }, [])

  return (
    <NavigationContainer>
      {DefaultStack(username, IdUser)}
    </NavigationContainer>
  )
}


export default App