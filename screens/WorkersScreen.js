import React, { useEffect, useState } from 'react'
import {Text, View, ScrollView, ActivityIndicator, StyleSheet, Alert, Button} from 'react-native'
import messages from '../utils/messages'
import { RESULTS_PER_PAGE } from '../constants'

const WorkersScreen = ({ route }) => {
  const [workers, setWorkers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  
  // Retrieve data from params
  const { category } = route.params

  useEffect(() => {
    async function loadWorkers() {
      setLoading(true)
      const query = `category=${category}&page=${page}&country=undefined&province=undefined&city=undefined&distance=undefined&min_hourly_price=undefined&max_hourly_price=undefined&employees=undefined&max_score=undefined&min_score=undefined&name=undefined`
      const response = await fetch(`https://www.changas.site/api/filters/get-workers?${query}`)
      const fetchedData = await response.json()
      if (fetchedData.error) {
        Alert.alert(messages.error.failed_worker_fetch)
        setWorkers([])
      }
      else {
        setWorkers(fetchedData.workers)
      }
      setLoading(false)
    }
    loadWorkers();
  }, [category, page])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {(workers.length !== 0) ? (
        workers.map((worker, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{worker.username}</Text>
            
            <Text style={styles.label}>Cotización:</Text>
            <Text style={styles.value}>${worker.hourly_price}/h</Text>
            
            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.value}>{worker.location}</Text>
            
            <Text style={styles.label}>N° de empleados:</Text>
            <Text style={styles.value}>{worker.employees}</Text>
            
            <Text style={styles.label}>Horas de atención:</Text>
            <Text style={styles.value}>{worker.attention_hours}</Text>
            
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.value}>{worker.description}</Text>
            
            <Text style={styles.label}>Puntaje:</Text>
            <Text style={styles.value}>{worker.score}/5</Text>
          </View>
        ))
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No hay trabajadores disponibles</Text>
        </View>
      )}
      <View style={styles.pagination}>
        {Number(page) > 0 ? <Button title='&lt;' onPress={() => setPage(Number(page) - 1)}/> : undefined}
        {workers.length === RESULTS_PER_PAGE ? <Button title='&gt;' onPress={() => setPage(Number(page) + 1)}/> : undefined}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 8,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#6c757d',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
})

export default WorkersScreen
