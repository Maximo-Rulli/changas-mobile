import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Button, ActivityIndicator } from 'react-native'
import { getUser } from '../actions/getUser'
import { getOffers } from '../actions/getOffers'
import { getJobs } from '../actions/getJobs'
import ProfileCard from '../components/ProfileCard'
import JobCard from '../components/JobCard'
import ProposalCard from '../components/ProposalCard'

const UserScreen = ({ navigation, route }) => {
  const [user, setUser] = useState({location: null, birth: null})
  const [jobs, setJobs] = useState([])
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)

  // Retrieve data from params
  const { IdUser, username } = route.params

  useEffect(() => {
    async function loadUserData() {
      if (IdUser) {
        const user_columns = 'location, birth'
        const fetchedUser = await getUser(IdUser, user_columns)
        setUser(fetchedUser || {location: null, birth: null})
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
      <ProfileCard user={user} />
      
      <Text style={styles.sectionHeader}>Oficio/s de {username}</Text>
      <View style={styles.cardContainer}>
        {jobs.length === 0
          ? <Text>{username} no ha subido trabajos</Text>
          : jobs.map((job, index) => <JobCard key={index} job={job} navigation={navigation} IdUser={IdUser}/>)
        }
      </View>

      <Text style={styles.sectionHeader}>Propuestas publicadas por {username}</Text>
      <View style={styles.cardContainer}>
        {proposals.length === 0
          ? <Text>{username} no ha publicado ofertas laborales</Text>
          : proposals.map((proposal, index) => <ProposalCard key={index} proposal={proposal} />)
        }
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
  cardContainer: {
    marginBottom: 20,
  },
}

export default UserScreen
