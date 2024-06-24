import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Button, ActivityIndicator } from 'react-native'
import useFetchUser from '../hooks/useFetchUser'
import Logout from '../actions/logout'
import { getUser } from '../actions/getUser'
import { getOffers } from '../actions/getOffers'
import { getJobs } from '../actions/getJobs'
import ProfileCard from '../components/ProfileCard'
import JobCard from '../components/JobCard'
import ProposalCard from '../components/ProposalCard'

const ProfileScreen = ({ navigation }) => {
  const { username, IdUser } = useFetchUser()
  const [user, setUser] = useState({ email: null, phone: null, location: null, birth: null, dni: null})
  const [jobs, setJobs] = useState([])
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserData() {
      if (IdUser) {
        const user_columns = 'email, phone, location, birth, dni'
        const fetchedUser = await getUser(IdUser, user_columns)
        setUser(fetchedUser || { email: null, phone: null, location: null, birth: null, dni: null })
        const proposals_columns = 'category, budget, open_date, location, description'
        const workers_columns = 'category, hourly_price, attention_hours, score, location, employees, description'
        setProposals(await getOffers(IdUser, proposals_columns))
        setJobs(await getJobs(IdUser, workers_columns))
        setLoading(false)
      }
    }
    loadUserData()
  }, [IdUser])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bienvenido a tu perfil {username}!</Text>
      <ProfileCard user={user} />
      
      <Text style={styles.sectionHeader}>Tus trabajos</Text>
      <View style={styles.cardContainer}>
        {jobs.length === 0
          ? <Text>No has subido trabajos</Text>
          : jobs.map((job, index) => <JobCard key={index} job={job} navigation={navigation} />)
        }
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Subir oficio" onPress={() => navigation.navigate('WorkersForm')} />
      </View>

      <Text style={styles.sectionHeader}>Propuestas publicadas por vos</Text>
      <View style={styles.cardContainer}>
        {proposals.length === 0
          ? <Text>No has publicado ofertas laborales</Text>
          : proposals.map((proposal, index) => <ProposalCard key={index} proposal={proposal} />)
        }
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Subir oferta laboral" onPress={() => navigation.navigate('ProposalsForm')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={() => Logout({ navigation })} />
      </View>
    </ScrollView>
  )
}


const styles = {
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
}

export default ProfileScreen
