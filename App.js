// React functionality imports
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens imports
import LoginScreen from './screens/LoginScreen'
import WorkersScreen from './screens/WorkersScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import ProposalsScreen from './screens/ProposalsScreen'
import ProfileScreen from './screens/ProfileScreen'
import ReviewsScreen from './screens/ReviewsScreen'
import RegisterScreen from './screens/RegisterScreen'
import ChatsDashboardScreen from './screens/ChatsDashboardScreen'
import ChatScreen from './screens/ChatScreen'
import WorkerFormScreen from './screens/WorkerFormScreen'
import ProposalFormScreen from './screens/ProposalFormScreen'
import UserScreen from './screens/UserScreen'
import ContractFormScreen from './screens/ContractFormScreen'

// Miscelaneous imports
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
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
        <Stack.Screen
        name="User"
        component={UserScreen}
        initialParams={{ IdUser: null, username: null }}
        options={({ route }) => ({ title: `Perfil de ${route.params.username}`})}
        />
        <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        initialParams={{ category: null, IdUser: null}}
        options={({ route }) => ({ title: `Reseñas de ${route.params.category}` })}
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
        <Stack.Screen
        name="User"
        component={UserScreen}
        initialParams={{ IdUser: null, username: null }}
        options={({ route }) => ({ title: `Perfil de ${route.params.username}`})}
        />
        <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        initialParams={{ category: null, IdUser: null}}
        options={({ route }) => ({ title: `Reseñas de ${route.params.category}` })}
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
        component={ProposalFormScreen}
        options={{title: 'Subir oferta laboral'}}
        />
        <Stack.Screen
        name="WorkersForm"
        initialParams={{IdUser, username}}
        component={WorkerFormScreen}
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
        component={ChatScreen}
        initialParams={{IdChat: null, OtherUser: null, OtherUsername: null, id_user1: null }}
        options={({ route }) => ({ title: `${route.params.OtherUsername}`})}
        />
        <Stack.Screen
        name="CreateContract"
        component={ContractFormScreen}
        initialParams={{IdUser: null, OtherUser: null}}
        options={{title: 'Crear contrato'}}
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
      <Tab.Screen
        name="ProfileRoot"
        component={ProfileRoot}
        initialParams={{IdUser, username}}
        options={{title: 'Perfil', headerShown: false}}
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
    </Tab.Navigator>
  )
}



const DefaultStack = ({ username, IdUser, loaded }) => {
  const { fontsLoaded } = useFontContext()

  useEffect(() => {
    async function hideSplash (){
      if (fontsLoaded && loaded){
        await SplashScreen.hideAsync()
      }
    }
    hideSplash()
  }, [fontsLoaded, loaded])

  return (
    <Stack.Navigator screenOptions={
      {safeAreaInsets: { top: 0, bottom: 0 }}}>
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

// The splash screen is not hidden by default as the app is currently loading
SplashScreen.preventAutoHideAsync()
const App = () => {
  const [loaded, setLoaded] = useState(false)
  const [username, setUsername] = useState(null)
  const [IdUser, setIdUser] = useState(null)

  useEffect(() => {
    async function getData (){
      setUsername(await SecureStore.getItemAsync('username'))
      setIdUser(await SecureStore.getItemAsync('id_user'))
      setLoaded(true)
    }
    getData()
  }, [])

  return (
    <NavigationContainer>
      <FontProvider>
        <DefaultStack username={username} IdUser={IdUser} loaded={loaded} />
      </FontProvider>
    </NavigationContainer>
  )
}


export default App