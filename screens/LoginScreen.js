import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Linking,
  Alert
} from 'react-native';
import AuthLogin from '../actions/login';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await AuthLogin(email, password);
      if (result) {
        const {id_user, username} = result
        // Reset the stack as the user just logged in
        navigation.reset({
          index: 0,
          routes: [{ name: 'Logged',
          params: { id_user: id_user, username: username } }],
        });
      }
    } catch (error) {
      // Raise error in case something fails in the backend
      Alert.alert('Error', error.message);
    }
  };

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
        <Text style={{color: 'blue'}}>Olvidaste la contraseña?</Text>
      </TouchableOpacity>
        
        <Button title="Iniciar sesión" onPress={handleLogin} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Nuevo en la plataforma?</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.changas.site/auth/signup')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;