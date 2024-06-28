import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { getWorkerRatings } from '../actions/getWorkerRatings'
import formatDate from '../utils/formatDate'
import LoadingScreen from './LoadingScreen'

const ReviewsScreen = ({ route }) => {
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Retrieve data from params
  const { category, IdUser } = route.params

  useEffect(() => {
    async function loadReviews() {
      const fetchedReviews = await getWorkerRatings(IdUser, category)
      setReviews(fetchedReviews)
      setLoading(false)
    }
    loadReviews()
  }, [category])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingScreen/>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {reviews.length !== 0 ? (
        reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Text style={styles.label}>Puntaje:</Text>
            <Text style={styles.value}>{review.score}</Text>

            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{formatDate(review.date.slice(0, 10))}</Text>

            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.value}>{review.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noReviewsText}>No hay reseñas hechas</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
container: {
  padding: 10,
  backgroundColor: '#F5F5F5',
},
reviewCard: {
  backgroundColor: '#FFFFFF',
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
},
label: {
  fontSize: 14,
  fontWeight: '600',
  color: '#555',
},
value: {
  fontSize: 16,
  fontWeight: '400',
  color: '#333',
  marginBottom: 8,
},
noReviewsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
})

export default ReviewsScreen
