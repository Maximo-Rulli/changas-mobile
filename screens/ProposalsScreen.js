import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, ActivityIndicator, StyleSheet, Alert, Button} from 'react-native'
import formatDate from '../utils/formatDate'
import messages from '../utils/messages'
import { RESULTS_PER_PAGE } from '../constants'

const ProposalsScreen = ({ route }) => {
  const [proposals, setProposals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  
  // Retrieve data from params
  const { category } = route.params

  useEffect(() => {
    async function loadProposals() {
      setLoading(true)
      const query = `category=${category}&page=${page}&country=undefined&province=undefined&city=undefined&distance=undefined&budget=undefined&openDate=undefined`
      const response = await fetch(`https://www.changas.site/api/filters/get-proposals?${query}`)
      const fetchedData = await response.json()
      if (fetchedData.error) {
        Alert.alert(messages.error.failed_proposal_fetch)
        setProposals([])
      }
      else {
        setProposals(fetchedData.proposals)
      }
      setLoading(false)
    }
    loadProposals()
  }, [category, page])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {(proposals.length !== 0) ? (
        proposals.map((proposal, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>Presupuesto:</Text>
            <Text style={styles.value}>${proposal.budget}</Text>
            
            <Text style={styles.label}>Ubicación:</Text>
            <Text style={styles.value}>{proposal.location}</Text>
            
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{formatDate(proposal.open_date.slice(0, 10))}</Text>
            
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.value}>{proposal.description}</Text>
          </View>
        ))
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No hay ninguna oferta de {category}</Text>
        </View>
      )}
      <View style={styles.pagination}>
        {Number(page) > 0 ? <Button title='&lt;' onPress={() => setPage(Number(page) - 1)}/> : undefined}
        {proposals.length === RESULTS_PER_PAGE ? <Button title='&gt;' onPress={() => setPage(Number(page) + 1)}/> : undefined}
      </View>
    </ScrollView>
  )
}

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

export default ProposalsScreen
