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
import { FontProvider, useFontContext } from './contexts/FontContext'
import { commonHeaderStyle } from './styles/commonHeaderStyle'


// Create the Stack and Tab navigators
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


function WorkersRoot() {
  const { fontsLoaded } = useFontContext()

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={commonHeaderStyle}>
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
  const { fontsLoaded } = useFontContext()

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={commonHeaderStyle}>
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
  const { fontsLoaded } = useFontContext()

  if (!fontsLoaded) {
    return null
  }

  const {IdUser, username} = route.params
  return (
    <Stack.Navigator screenOptions={commonHeaderStyle}>
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
  const { fontsLoaded } = useFontContext()

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={commonHeaderStyle}>
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
  const { fontsLoaded } = useFontContext()

  if (!fontsLoaded) {
    return null
  }

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
        options={{
          title: 'Bienvenido', 
          headerStyle: {
          backgroundColor: commonHeaderStyle.headerStyle.backgroundColor,
          },
          headerTintColor: commonHeaderStyle.headerTintColor,
          headerTitleStyle: {
            fontFamily: commonHeaderStyle.headerTitleStyle.fontFamily,
          }}}
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



const DefaultStack = ({ username, IdUser }) => {
  const { fontsLoaded } = useFontContext()

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={commonHeaderStyle}>
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
          options={{title: 'Inicie sesión' }}
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
        options={{title: 'Inicie sesión'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Registrarse'}}
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
      <FontProvider>
        <DefaultStack username={username} IdUser={IdUser} />
      </FontProvider>
    </NavigationContainer>
    
  )
}


export default App