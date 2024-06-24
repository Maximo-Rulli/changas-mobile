import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Button, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import {getCategories} from '../actions/getCategories'
import messages from '../utils/messages'

const WorkerFormScreen = ({ navigation, route }) => {
  const [hourlyPrice, setHourlyPrice] = useState('')
  const [category, setCategory] = useState('')
  const [attentionHours, setAttentionHours] = useState('')
  const [employees, setEmployees] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [country, setCountry] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Retrieve data from params
  const { IdUser, username } = route.params

  // Retrieve Categories from supabase
  useEffect(() => {
    async function loadCategories(){
      setCategories(await getCategories('name'))
    }
    loadCategories()
  }, [])


  // Auxiliary functions to ensure that the user enters valid params
  const handlePriceChange = (text) => {
    // Remove any dots from the input to ensure only integer values
    const cleanInput = text.replace(/\./g, '')
    const price = parseInt(cleanInput, 10)
    if ((price > 0 && price < 1000000) || text === '') {
      setHourlyPrice(cleanInput)
    }
  }

  const handleEmployeesChange = (text) => {
  // Remove any dots from the input to ensure only integer values
  const cleanInput = text.replace(/\./g, '')
  const employees = parseInt(cleanInput, 10)
  if ((employees > 0 && employees < 30000) || text === '') {
    setEmployees(cleanInput)
  }
  }
  
  const handleSubmit = async () => {
    setLoading(true)

    if (hourlyPrice === '' || category === '' || attentionHours === '' || employees === '' || city === '' || province === '' || country === '' || description === ''){
      setError(messages.error.form_field_required)
      setLoading(false)
    }
    else {
      // Validate and return accurate location
      const locationResponse = await fetch('https://www.changas.site/api/geo/get-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, province, country, complete: true })
      })
      const unstrucResponse = await locationResponse.json()

      // We assume that a successful response will return 200
      if (locationResponse.status !== 200){
        setError(unstrucResponse.message)
        setLoading(false)
      }

      else {
        const location = unstrucResponse.city + ', ' + unstrucResponse.province + ', ' + unstrucResponse.country
        const lat = unstrucResponse.lat
        const lng = unstrucResponse.lng
      
        const sendData = { category, IdUser, hourlyPrice, attentionHours, username, location, lat, lng, employees, description }
      
        setError(null)
      
        const response = await fetch('https://www.changas.site/api/forms/upload-job', {
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
            routes: [{ name: 'Profile' }],
          })
        }
      }
    } 
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView style={{paddingHorizontal: 25}}>
        
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: '#AD40AF', fontWeight: '700'}}> Volver</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Selecciona tu oficio:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((item) => (
            <Picker.Item label={item.name} value={item.name} key={item.name} />
          ))}
        </Picker>
      </View>

      <Text>Precio por hora:</Text>
      <TextInput
        label='hourlyPrice'
        placeholder="1000"
        value={hourlyPrice}
        onChangeText={handlePriceChange}
        keyboardType='numeric'
        maxLength={9}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Horas de atención:</Text>
      <TextInput
        label='attentionHours'
        placeholder="Lunes a jueves de 8 a 17"
        onChangeText={text => setAttentionHours(text)}
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

      <Text>Provincia:</Text>
      <TextInput
        label='province'
        placeholder="Provincia de residencia"
        onChangeText={text => setProvince(text)}
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

      <Text>Número de empleados:</Text>
      <TextInput
        label='employees'
        placeholder="1"
        value={employees}
        onChangeText={handleEmployeesChange}
        keyboardType='numeric'
        maxLength={5}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Descripción del trabajo:</Text>
      <TextInput
        label='description'
        placeholder="Descripción..."
        onChangeText={text => setDescription(text)}
        multiline={true}
        maxLength={300}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

        
        <Button title="Subir oficio" disabled={loading} onPress={handleSubmit}/>
        <View style={[styles.errorContainer, error ? styles.visible : styles.hidden]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
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
})

export default WorkerFormScreen;
