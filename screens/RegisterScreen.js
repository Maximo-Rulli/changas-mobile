import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text,
  TextInput, TouchableOpacity, Button,
  ScrollView, Alert, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import loadProvinces from '../utils/loadProvinces'
import loadCities from '../utils/loadCities'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import formatDate from '../utils/formatDate'
import messages from '../utils/messages'

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  // Cities is a variable to store the current province cities, not the selected one
  const [provinceCities, setProvinceCities] = useState('')
  const [cities, setCities] = useState('')
  const [city, setCity] = useState('')
  const [filterCity, setFilterCity] = useState('')

  const [province, setProvince] = useState('')
  const [country, setCountry] = useState('Argentina')
  const [phone, setPhone] = useState('')
  const [dni, setDni] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Get the 18 year old date
  const today = new Date()
  const minBirth = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
  const [birth, setBirth] = useState(formatDate(minBirth.toISOString()))
  console.log(minBirth.toISOString(), minBirth.toLocaleString())
  const [showDatePickerIOS, setShowDatePickerIOS] = useState(false)

  // Load provinces
  const provinces = loadProvinces(country)

  // Retrieve and set initial province
  useEffect(() => {
    async function loadData(){
      setLoading(true)
      setProvince(provinces[0].name)
      setProvinceCities(loadCities(country, provinces, provinces[0].name))
      setLoading(false)
    }
    loadData()
  }, [])


  // Set the current city to the first loaded
  useEffect(() => {
    async function autosetCity(){
      if (cities.length !== 0){
        setCity(cities[0])
      }
    }
    autosetCity()
  }, [cities])


  // Auxiliary function for filtering cities
  const handleCityFilterChange = (text) => {
    // Filter province cities that match the filter
    const filteredCities = provinceCities.filter(city => city.toLowerCase().includes(text.toLowerCase()))
    setCities(filteredCities)
    setFilterCity(text)
    setCity(filteredCities[0])
  }

  const onDateChange = (_, selectedDate) => {
    setBirth(selectedDate)
  }

  // Define DatePicker for Android (imperative API)
  const showDatepickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: birth,
      onChange: onDateChange,
      mode: 'date',
      is24Hour: true,
      maximumDate: minBirth,
    })
  }



  const handleLogin = async () => {
    try {
      setLoading(true)

      //Check if the email is valid
      const re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const valid_mail = re.test(String(email).toLowerCase())
      if (email === '' || !valid_mail){
        setError(messages.error.email_invalid)
      }
      else if (password === '' || password.length < 3){
        setError(messages.error.password_invalid)
      }
      else if (name === ''){
        setError(messages.error.name_required)
      }
      else if (surname === ''){
        setError(messages.error.name_required)
      }
      else if (city === ''){
        setError(messages.error.location_required)
      }
      else if (province === ''){
        setError(messages.error.location_required)
      }
      else if (country === ''){
        setError(messages.error.location_required)
      }
      else if (day === ''){
        setError(messages.error.birth_required)
      }
      else if (month === ''){
        setError(messages.error.birth_required)
      }
      else if (year === ''){
        setError(messages.error.birth_required)
      }
      else if (dni === '' || dni.length !== 8){
        setError(messages.error.dni_invalid)
      }
      else if (!(birth < minBirth)) {
        setError(messages.error.birth_invalid)
      }
      else {
        setError('')
        const sendData = { email, password, name, surname, city, province, country, phone, birth, dni }
        const response = await fetch('https://www.changas.site/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData)
        })

        const data = await response.json()

        setLoading(false)

        if (data.error) {
          setError(data.error)
        }

        if (data.message) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login'}],
          })
        }
      }
    } catch (error) {
      // Raise error in case something fails
      Alert.alert('Error', error.message)
    }
  }



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

      {/*
      FOR NOW THE ONLY AVAILABLE COUNTRY IS ARGENTINA
      <Text>País:</Text>
      <TextInput
        label='country'
        autoComplete='country'
        placeholder="País de residencia"
        onChangeText={text => setCountry(text)}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />*/}

      <Text style={styles.label}>Provincia:</Text>
      <View>
        <Picker
          selectedValue={province}
          onValueChange={(itemValue) => {
            setProvince(itemValue)  
            setProvinceCities(loadCities(country, provinces, itemValue))
            setCities(loadCities(country, provinces, itemValue))
            setFilterCity('')
          }}
          style={styles.picker}
        >
          {provinces.map((item) => (
            <Picker.Item label={item.name} value={item.name} key={item.code} />
          ))}
        </Picker>
      </View>

      <Text>Ciudad:</Text>
      <TextInput
        label='city'
        placeholder="Filtrar ciudades"
        onChangeText={handleCityFilterChange}
        value={filterCity}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      {cities && <View>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => {setCity(itemValue)}}
          style={styles.picker}
        >
          {cities.map((item) => (
            <Picker.Item label={item} value={item} key={item} />
          ))}
        </Picker>
      </View>}

      <Text>Fecha de nacimiento:</Text>
      {
      Platform.OS === 'android' ? (
        // In Android we must use the imperative API
        <View>
          <Button onPress={showDatepickerAndroid} title="Elegir fecha" />
          <Text>{birth.toLocaleString().slice(0, 10)}</Text>
        </View>)
      :
      (
      // In IOS we may opt for the non imperative API
      <View>
        <Button onPress={() => {setShowDatePickerIOS(true)}} title="Elegir fecha" />
        {showDatePickerIOS && <DateTimePicker
          value={birth}
          mode={'date'}
          is24Hour={true}
          onChange={onDateChange}
          maximumDate={minBirth}
        />}
        <Text>{birth.toLocaleString().slice(0, 10)}</Text>
      </View>
      )
      }

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
  )
}

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
})

export default RegisterScreen