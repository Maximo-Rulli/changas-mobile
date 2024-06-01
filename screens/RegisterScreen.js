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
import messages from '../utils/messages';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the 18 year old date
  const today = new Date()
  const minBirth = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

  const handleLogin = async () => {
    try {
      setLoading(true)

      //Check if the email is valid
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const valid_mail = re.test(String(email).toLowerCase())
      if (email === '' || !valid_mail){
        setError(messages.error.email_invalid);
      }
      else if (password === '' || password.length < 3){
        setError(messages.error.password_invalid);
      }
      else if (name === ''){
        setError(messages.error.name_required);
      }
      else if (surname === ''){
        setError(messages.error.name_required);
      }
      else if (city === ''){
        setError(messages.error.location_required);
      }
      else if (province === ''){
        setError(messages.error.location_required);
      }
      else if (country === ''){
        setError(messages.error.location_required);
      }
      else if (day === ''){
        setError(messages.error.birth_required);
      }
      else if (month === ''){
        setError(messages.error.birth_required);
      }
      else if (year === ''){
        setError(messages.error.birth_required);
      }
      else if (dni === '' || dni.length !== 8){
        setError(messages.error.dni_invalid);
      }
      else if (!(birth < minBirth)) {
        setError(messages.error.birth_invalid);
      }
      else {
        setError('');
        const sendData = { email, password, name, surname, city, province, country, phone, birth, dni }
        const response = await fetch('https://www.changas.site/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData)
        });

        const data = await response.json()

        setLoading(false)

        if (data.error) {
          setError(data.error)
        }

        if (data.message) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login'}],
          });
        }
      }
    } catch (error) {
      // Raise error in case something fails
      Alert.alert('Error', error.message);
    }
  };

  const handleDayChange = (text) => {
    if (/^\d{0,2}$/.test(text)) {
      if (text === '' || (text.length <= 2 && parseInt(text, 10) >= 1 && parseInt(text, 10) <= 31)) {
        setDay(text);
      } else if (text === '0'){
        setDay('');
      }
    }
  };

  const handleDayBlur = () => {
    if (day.length === 1) {
      setDay(`0${day}`);
    }
    handleDateBlur();
  };


  const handleMonthChange = (text) => {
    if (/^\d{0,2}$/.test(text)) {
      if (text === '' || (text.length <= 2 && parseInt(text, 10) >= 1 && parseInt(text, 10) <= 12)) {
        setMonth(text);
      } 
      else if (text === '0'){
        setMonth('');
      }
    }
  };

  const handleMonthBlur = () => {
    if (month.length === 1) {
      setMonth(`0${month}`);
    }
    handleDateBlur();
  };

  const handleDateBlur = () => {
    if (day.length === 2 && month.length === 2  && year.length === 4){
      setBirth(new Date(`${year}-${month}-${day}`));
    }
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
          onChangeText={text => setYear(text)}
          onBlur={handleDateBlur}
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
        
        <Button title="Registrate" disabled={loading} onPress={handleLogin}/>
        <View style={[styles.errorContainer, error ? styles.visible : styles.hidden]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
});

export default RegisterScreen;