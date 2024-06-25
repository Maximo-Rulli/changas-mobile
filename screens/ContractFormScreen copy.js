import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Button, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import messages from '../utils/messages'
import { getJobs } from '../actions/getJobs'

const ContractFormScreen = ({ navigation, route }) => {
  const [category, setCategory] = useState([])
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')
  const [userType, setUserType] = useState('')
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Retrieve data from params
  const { IdUser, OtherUser } = route.params

  // Retrieve Categories from supabase
  useEffect(() => {
    async function loadCategories(){
      setCategories(await getJobs(IdUser,'category'))
    }
    loadCategories()
  }, [])


  // Auxiliary functions to ensure that the user enters valid params
  const handleBudgetChange = (text) => {
    // Remove any dots from the input to ensure only integer values
    const cleanInput = text.replace(/\./g, '')
    const budget = parseInt(cleanInput, 10)
    if ((budget > 0 && budget < 1000000) || text === '') {
      setBudget(cleanInput)
    }
  }
  
  const handleSubmit = async () => {
    setLoading(true)

    if (budget === '' || category === '' || description === ''){
      setError(messages.error.form_field_required)
      setLoading(false)
    }
    else {

        const sendData = { userType, IdUser, OtherUser, category, 
            jobtitle, date, budget, description, payformat }
      
        setError(null)
      
        const response = await fetch('https://www.changas.site/api/forms/upload-offer', {
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

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>

      <Text style={styles.label}>Indica el servicio solicitado/a ofrecer:</Text>
      {categories.length > 0 ? <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((item) => (
            <Picker.Item label={item.name} value={item.name} key={item.name} />
          ))}
        </Picker>
      </View> : 
      <Text>No hay oficio registrado</Text>}

      <Text>Presupuesto:</Text>
      <TextInput
        label='budget'
        placeholder="10000"
        value={budget}
        onChangeText={handleBudgetChange}
        keyboardType='numeric'
        maxLength={9}
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

        <Button title="Crear contrato" disabled={loading} onPress={handleSubmit}/>
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

export default ContractFormScreen
