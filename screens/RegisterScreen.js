import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      
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

  const handleDayChange = (text) => {
    if (/^\d{0,2}$/.test(text)) {
      if (text === '' || (text.length <= 2 && parseInt(text, 10) >= 1 && parseInt(text, 10) <= 31)) {
        setDay(text);
        setError('');
      } else if (text === '0'){
        setDay('');
        setError('');
      } else {
        setError('Invalid day');
      }
    }
  };

  const handleDayBlur = () => {
    if (day.length === 1) {
      setDay(`0${day}`);
    }
  };


  const handleMonthChange = (text) => {
    if (/^\d{0,2}$/.test(text)) {
      if (text === '' || (text.length <= 2 && parseInt(text, 10) >= 1 && parseInt(text, 10) <= 12)) {
        setMonth(text);
        setError('');
      } 
      else if (text === '0'){
        setMonth('');
        setError('');
      }
      else {
        setError('Invalid month');
      }
    }
  };

  const handleMonthBlur = () => {
    if (month.length === 1) {
      setMonth(`0${month}`);
    }
  };

  const handleYearChange = (text) => {
    /*if (/^\d{0,4}$/.test(text)) {
      if (text === '' || (text.length === 4 && parseInt(text, 10) >= 1900 && parseInt(text, 10) <= 2100)) {
        setYear(text);
        setError('');
      } else {
        setError('Invalid year');
      }
    }*/
    setYear(text);
  };

  const handleYearBlur = () => {
    console.log(parseInt(year, 10))
  };


  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView style={{paddingHorizontal: 25}}>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Registrarse
        </Text>

      <Text>Email:</Text>
      <TextInput 
        label='email'
        autoComplete='email'
        keyboardType="email-address"
        placeholder="Ingresa el mail"
        onChangeText={text => setEmail(text)}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Contraseña:</Text>
      <TextInput
        label='password'
        placeholder="Ingresa la contraseña"
        onChangeText={text => setPassword(text)}
        maxLength={30}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Nombre:</Text>
      <TextInput
        label='name'
        autoComplete='name'
        placeholder="Ingresa tu nombre"
        onChangeText={text => setName(text)}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Apellido:</Text>
      <TextInput
        label='surname'
        autoComplete='family-name'
        placeholder="Ingresa tu apellido"
        onChangeText={text => setSurname(text)}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Ciudad:</Text>
      <TextInput
        label='city'
        placeholder="Ciudad de residencia"
        onChangeText={text => setCity(text)}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Provincia:</Text>
      <TextInput
        label='province'
        placeholder="Provincia de residencia"
        onChangeText={text => setProvince(text)}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>País:</Text>
      <TextInput
        label='country'
        autoComplete='country'
        placeholder="País de residencia"
        onChangeText={text => setCountry(text)}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Fecha de nacimiento:</Text>
      <View style={styles.row}>
        <TextInput
          value={day}
          placeholder='Día'
          onChangeText={handleDayChange}
          onBlur={handleDayBlur}
          style={styles.input}
          keyboardType='numeric'
          maxLength={2}
        />
        <TextInput
          value={month}
          placeholder='Mes'
          onChangeText={handleMonthChange}
          onBlur={handleMonthBlur}
          style={styles.input}
          keyboardType='numeric'
          maxLength={2}
        />
        <TextInput
          value={year}
          placeholder='Año'
          onChangeText={handleYearChange}
          onBlur={handleYearBlur}
          style={styles.input}
          keyboardType='numeric'
          maxLength={4}
        />
      </View>

      <Text>DNI (sin puntos ni comas):</Text>
      <TextInput
        label='dni'
        inputMode='numeric'
        placeholder="Ingresa tu DNI sin puntos ni comas"
        onChangeText={text => setDni(text)}
        maxLength={8}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Telefóno (opcional):</Text>
      <TextInput
        label='phone'
        autoComplete='tel'
        inputMode='tel'
        placeholder="Número de telefóno (opcional)"
        onChangeText={text => setPhone(text)}
        maxLength={15}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />
        
        <Button title="Registrate" onPress={handleLogin} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 10,
    flex: 1,
    marginRight: 5,
  },
});

export default RegisterScreen;