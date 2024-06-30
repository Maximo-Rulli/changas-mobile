import React, { useEffect, useState, useRef } from 'react'
import { Text, View, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import useFetchUser from '../hooks/useFetchUser'
import { getContractsUsers } from '../actions/getContractsUsers'
import LoadingScreen from './LoadingScreen'
import DealLink from '../components/DealLink'
import formatDate from '../utils/formatDate'

const UsersContractsScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true)
  const [contracts, setContracts] = useState(null)

  const { IdUser } = useFetchUser()
  const { OtherUser, OtherUsername } = route.params

  // Check if screen is focused to re-render page
  const isFocused = useIsFocused()

  // Setup scrollviewref to automatically scroll down
  const scrollViewRef = useRef()

  const loadContracts = async () => {
    if (IdUser && OtherUser) {
      setLoading(true)
      const fetchedContracts = await getContractsUsers(IdUser, OtherUser)
      setContracts(fetchedContracts)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContracts()
  }, [IdUser, OtherUser, isFocused])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingScreen/>
      </View>
    )
  }

  const renderContract = ({ item }) => {
    return (
      <View style={styles.contractCard}>
        <Text style={styles.contractTitle}>{item.title}</Text>
        <Text style={styles.contractDetail}>Servicio: {item.category}</Text>
        <Text style={styles.contractDetail}>Presupuesto: {item.budget}</Text>
        <Text style={styles.contractDetail}>Descripción: {item.description}</Text>
        <Text style={styles.contractDetail}>Fecha: {formatDate(item.date)}</Text>
        <DealLink contract={item} IdUser={IdUser} OtherUsername={OtherUsername} onContractUpdate={loadContracts} navigation={navigation}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} ref={scrollViewRef}>
      <FlatList
        data={contracts}
        renderItem={renderContract}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.contractsContainer}
        inverted={true}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contractsContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contractCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contractTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  contractDetail: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
})

export default UsersContractsScreen
