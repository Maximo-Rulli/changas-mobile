import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Button, TextInput, StyleSheet, Platform } from 'react-native'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import messages from '../utils/messages'
import { getContract } from '../actions/getContract'


const CounterdealScreen = ({ navigation, route }) => {
  const [jobtitle, setJobTitle] = useState('')
  const [category, setCategory] = useState('')
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')
  const [IdWorker, setIdWorker] = useState('')
  const [IdContractor, setIdContractor] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Variables needed for the Date Picker
  const [date, setDate] = useState(new Date())
  const [showDatePickerIOS, setShowDatePickerIOS] = useState(false)

  // Retrieve data from params
  const { IdUser, IdContract, workerTurn } = route.params

  // Retrieve contract from supabase
  useEffect(() => {
    async function loadContractIds(){
      setLoading(true)
      const columns = 'id_worker, id_contractor'
      const fetchedIds = await getContract(IdContract, columns)
      setJobTitle(route.params.jobtitle)
      setCategory(route.params.category)
      setBudget(route.params.budget)
      setDescription(route.params.description)
      setDate(route.params.date)
      setIdContractor(fetchedIds.id_contractor)
      setIdWorker(fetchedIds.id_worker)
      setLoading(false)
    }
    loadContractIds()
  }, [])


  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate)
  }

  // Define DatePicker for Android (imperative API)
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

    if (budget === '' || description === '' || jobtitle === '' || date === ''){
      setError(messages.error.form_field_required)
      setLoading(false)
    }
    else {
        const payformat = false
        const sendData = { IdContract, IdUser, IdWorker, IdContractor,
          jobtitle, date, budget, description, payformat, workerTurn }
      
        setError(null)
      
        const response = await fetch('https://www.changas.site/api/forms/update-contract', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData)
        })
        const data = await response.json()

        setLoading(false)
      
        if (data.status !== 200) {
          setError(data.error)
        }
        else {
          navigation.goBack()
        }
    }
  }


  return (
    <ScrollView>
      <Text style={styles.label}>Servicio: {category}</Text>

      <Text>Título del trabajo:</Text>
      <TextInput
        label='jobtitle'
        placeholder="Título del trabajo"
        onChangeText={text => setJobTitle(text)}
        value={jobtitle}
        maxLength={40}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Descripción del trabajo:</Text>
      <TextInput
        label='description'
        placeholder="Descripción..."
        onChangeText={text => setDescription(text)}
        value={description}
        multiline={true}
        maxLength={300}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Presupuesto:</Text>
      <TextInput
        label='budget'
        placeholder="10000"
        value={`${budget}`}
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

      <Button title="Contraofertar" disabled={loading} onPress={handleSubmit}/>
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

export default CounterdealScreen
