import React, { useState, useEffect } from 'react';
import {Text, View, ScrollView, Button, TextInput, StyleSheet } from 'react-native';
import useFetchUser from '../hooks/useFetchUser';
import formatDate from '../utils/formatDate';

const ProposalsFormScreen = ({ navigation, route }) => {
    const [hourlyPrice, setHourlyPrice] = useState('');
    const [category, setCategory] = useState('');
    const [attentionHours, setAttentionHours] = useState('');
    const [employees, setEmployees] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
  
    // Retrieve data from params
    const { IdUser, username } = route.params;
  
    // Auxiliary functions to ensure that the user enters valid params
    const handlePriceChange = (text) => {
      const price = parseInt(text, 10);
      if (price > 0 && price < 999999999) {
        setHourlyPrice(text);
      }
    };
  
    const handleEmployeesChange = (text) => {
      const employees = parseInt(text, 10);
      if (employees > 0 && employees < 30000) {
        setEmployees(text);
      }
    };
    
    const handleSubmit = async () => {
    
      // Validate and return accurate location
      const locationResponse = await fetch('https://www.changas.site/api/geo/get-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, province, country, complete: true })
      })
      const unstrucResponse = await locationResponse.json()
      const location = unstrucResponse.city + ', ' + unstrucResponse.province + ', ' + unstrucResponse.country
      const lat = unstrucResponse.lat
      const lng = unstrucResponse.lng
    
      const sendData = { category, IdUser, hourlyPrice, attentionHours, username, location, lat, lng, employees, description }
    
      setLoading(true)
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
        });
      }
    }
  
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView style={{paddingHorizontal: 25}}>
          
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Volver</Text>
        </TouchableOpacity>
  
        <Text>Elige un tipo de trabajo:</Text>
        <TextInput
          label='category'
          placeholder="Ciudad de residencia"
          onChangeText={text => setCategory(text)}
          maxLength={40}
          style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
        />
  
        <Text>Precio por hora:</Text>
        <TextInput
          label='hourlyPrice'
          placeholder="1000"
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


export default ProposalsFormScreen;
