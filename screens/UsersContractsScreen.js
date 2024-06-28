import React, { useEffect, useState, useRef } from 'react'
import { Text, View, SafeAreaView, 
  TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import useFetchUser from '../hooks/useFetchUser'
import { getContractsUsers } from '../actions/getContractsUsers'
import LoadingScreen from './LoadingScreen'

const UsersContractsScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true)
  const [contracts, setContracts] = useState([])

  const { IdUser } = useFetchUser()
  const { OtherUser } = route.params

  // Setup scrollviewref to automatically scroll down
  const scrollViewRef = useRef()

  useEffect(() => {
    async function loadContracts() {
      if (IdUser && OtherUser) {
        setLoading(true)
        const fetchedContracts = await getContractsUsers(IdUser, OtherUser)
        await seeChat(IdChat, UserNumber)
        setContracts(fetchedContracts.content)
        setLoading(false)
      }
    }
    loadContracts()
  }, [IdUser, OtherUser])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingScreen/>
      </View>
    )
  }

  const renderContract = ({ item }) => {
    return (
      <View>
        <Text>{item.message}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} ref={scrollViewRef}>
      <FlatList
          data={[...contracts].reverse()}
          renderItem={renderContract}
          keyExtractor={(_, index) => index.toString()}
          // contentContainerStyle={styles.contractsContainer}
          inverted={true}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default UsersContractsScreen
