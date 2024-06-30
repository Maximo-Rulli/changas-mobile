import React from 'react'
import { Text, View, Button } from 'react-native'

const JobCard = ({ job, navigation, IdUser }) => (
    <View style={styles.card}>
      <Text>Nombre del oficio: {job.category}</Text>
      <Text>Precio por hora: ${job.hourly_price}</Text>
      <Text>Ubicación: {job.location}</Text>
      <Text>Cantidad de empleados: {job.employees}</Text>
      <Text>Horas de atención: {job.attention_hours}</Text>
      <Text>Descripción: {job.description}</Text>
      <Text>Puntaje: {job.score}/5</Text>
      <View style={styles.buttonContainer}>
          <Button title="Reseñas" onPress={() => navigation.navigate('UserReviews', { category: job.category, IdUser: IdUser })} />
      </View>
    </View>
)

const styles = {
    buttonContainer: {
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#E5E7EB',
      padding: 10,
      marginBottom: 10,
    },
}

export default JobCard