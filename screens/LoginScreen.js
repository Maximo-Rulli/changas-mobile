import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Linking,
  Alert,
  StyleSheet
} from 'react-native'
import AuthLogin from '../actions/login'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await AuthLogin(email, password)
      if (result) {
        const {IdUser, username} = result
        // Reset the stack as the user just logged in
        navigation.reset({
          index: 0,
          routes: [{ name: 'Logged',
          params: { IdUser: IdUser, username: username } }],
        });
      }
    } catch (e) {
      // Raise error in case something fails in the backend
      setError(e.message)
      Alert.alert('Error', e.message)
    }
    setLoading(false)
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Inicio de sesión
        </Text>

        <TextInput 
        label='email'
        keyboardType="email-address"
        placeholder="Ingresa el mail"
        onChangeText={text => setEmail(text)}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <TextInput
        label='password'
        secureTextEntry={true}
        placeholder="Ingresa la contraseña"
        onChangeText={text => setPassword(text)}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <TouchableOpacity onPress={() => Linking.openURL('https://www.changas.site/auth/forget-password')}>
        <Text>Olvidaste la contraseña?</Text>
      </TouchableOpacity>
        
        <Button title="Iniciar sesión" onPress={handleLogin} disabled={loading}/>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>¿Nuevo en la plataforma?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={loading}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Regístrate</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.errorContainer, error ? styles.visible : styles.hidden]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    borderColor: 'red',
    backgroundColor: '#F8D7DA',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
  },
  hidden: {
    display: 'none',
  },
  visible: {
    display: 'flex',
  },
})

export default LoginScreen