import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, ScrollView, Button, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import RadioGroup from 'react-native-radio-buttons-group'
import { getJobs } from '../actions/getJobs'


const ContractFormScreen = ({ navigation, route }) => {
  const [jobtitle, setJobTitle] = useState('')
  const [category, setCategory] = useState([])
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')
  const [userType, setUserType] = useState('')
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Variables needed for the Date Picker
  const [date, setDate] = useState(new Date())
  const [showDatePickerIOS, setShowDatePickerIOS] = useState(false)

  // Retrieve data from params
  const { IdUser, OtherUser } = route.params

  // Define Radiobuttons
  const radioButtons = useMemo(() => ([
    {
        id: 'worker',
        label: 'Ofrezco',
        value: 'worker'
    },
    {
        id: 'contractor',
        label: 'Solicito',
        value: 'contractor'
    }
    ]), [])

  // Retrieve Categories from supabase
  useEffect(() => {
    async function loadCategories(){
      if (userType === 'worker') {
        console.log(IdUser)
        console.log(await getJobs(IdUser,'category'))
        setCategories(await getJobs(IdUser,'category'))
      }
      else if (userType === 'contractor'){
        setCategories(await getJobs(OtherUser,'category'))
      }
    }
    console.log(categories)
    loadCategories()
  }, [userType])

  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate)
  }

  const showDatepickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onDateChange,
      mode: 'date',
      is24Hour: true,
      minimumDate: (new Date()),
    })
  }

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
        const payformat = false
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
    <SafeAreaView>
      <Text>¿Ofrece un servicio o lo solicita?</Text>
      <RadioGroup 
        radioButtons={radioButtons} 
        onPress={setUserType}
        selectedId={userType}
        layout='row'
      />

      <Text style={styles.label}>Selecciona el servicio:</Text>
      {categories && <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((item) => (
            <Picker.Item label={item.category} value={item.category} key={item.category} />
          ))}
        </Picker>
      </View>}

      <Text>Título del trabajo:</Text>
      <TextInput
        label='jobtitle'
        placeholder="Título del trabajo"
        onChangeText={text => setJobTitle(text)}
        maxLength={40}
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

      {
      Platform.OS === 'android' ? (
        // In Android we must use the imperative API
        <View>
          <Button onPress={showDatepickerAndroid} title="Elegir fecha" />
          <Text>Fecha: {date.toLocaleString().slice(0, 10)}</Text>
        </View>)
      :
      (
      // In IOS we may opt for the non imperative API
      <View>
        <Button onPress={() => {setShowDatePickerIOS(true)}} title="Elegir fecha" />
        {showDatePickerIOS && <DateTimePicker
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onDateChange}
          minimumDate={new Date()}
        />}
        <Text>Fecha: {date.toLocaleString().slice(0, 10)}</Text>
      </View>
      )
      }

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

export default ContractFormScreen
