import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Button, TextInput, StyleSheet } from 'react-native'
import { getContract } from '../actions/getContract'
import messages from '../utils/messages'


const ReviewScreen = ({ navigation, route }) => {
  const [score, setScore] = useState('')
  const [ReviewerId, setReviewerId] = useState('')
  const [ReviewedId, setReviewedId] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Retrieve data from params
  const { IdContract, category } = route.params

  // Retrieve IDs from supabase
  useEffect(() => {
    async function loadContractIds(){
      setLoading(true)
      const columns = 'id_worker, id_contractor'
      const fetchedIds = await getContract(IdContract, columns)
      setReviewerId(fetchedIds.id_contractor)
      setReviewedId(fetchedIds.id_worker)
      setLoading(false)
    }
    loadContractIds()
  }, [])


  // Auxiliary functions to ensure that the user enters valid params
  const handleScoreChange = (text) => {
    // Remove any dots from the input to ensure only integer values
    const cleanInput = text.replace(/\./g, '')
    const budget = parseInt(cleanInput, 10)
    if ((budget > 0 && budget < 6) || text === '') {
      setScore(cleanInput)
    }
  }
  
  const handleSubmit = async () => {
    setLoading(true)

    if (score === '' || description === ''){
      setError(messages.error.form_field_required)
      setLoading(false)
    }
    else {
        const sendData = { id_contract: IdContract, id_reviewer_user: ReviewerId, 
          id_reviewed_user: ReviewedId, category, description, score }
      
        setError(null)
      
        const response = await fetch('https://www.changas.site/api/forms/upload-review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData)
        })
        const data = await response.json()
      
        setLoading(false)
        if (response.status !== 200) {
          setError(data.error)
        }
        else {
          navigation.goBack()
        }
    }
  }


  return (
    <ScrollView>
      <Text>Servicio {category}</Text>

      <Text>Puntaje (1-5):</Text>
      <TextInput
        label='score'
        placeholder="Puntaje"
        value={score}
        onChangeText={handleScoreChange}
        keyboardType='numeric'
        maxLength={1}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Text>Descripción de la reseña:</Text>
      <TextInput
        label='description'
        placeholder="Descripción..."
        onChangeText={text => setDescription(text)}
        multiline={true}
        maxLength={300}
        style={{borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10}}
      />

      <Button title="Reseñar" disabled={loading} onPress={handleSubmit}/>
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

export default ReviewScreen
