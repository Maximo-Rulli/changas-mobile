import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button, StyleSheet } from 'react-native';
import useFetchUser from '../hooks/useFetchUser';
import Logout from '../actions/logout';
import { getUser } from '../actions/getUser';
import { getOffers } from '../actions/getOffers';
import { getJobs } from '../actions/getJobs';
import formatDate from '../utils/formatDate';

const ProfileScreen = ({ navigation }) => {
  const { username, id_user } = useFetchUser();
  const [user, setUser] = useState({ email: null, phone: null, location: null, birth: null, dni: null});
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      if (id_user) {
        const fetchedUser = await getUser(id_user);
        setUser(fetchedUser || { email: null, phone: null, location: null, birth: null, dni: null });
        setProposals(await getOffers(id_user));
        setJobs(await getJobs(id_user));
        setLoading(false);
      }
    }
    loadUserData();
  }, [id_user]);

  if (loading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bienvenido a tu perfil {username}!</Text>
      <ProfileCard user={user} />
      
      <Text style={styles.sectionHeader}>Tus trabajos</Text>
      <View style={styles.cardContainer}>
        {jobs.length === 0
          ? <Text>No has subido trabajos</Text>
          : jobs.map(job => <JobCard key={job.id} job={job} />)
        }
      </View>

      <Text style={styles.sectionHeader}>Propuestas publicadas por vos</Text>
      <View style={styles.cardContainer}>
        {proposals.length === 0
          ? <Text>No has publicado ofertas laborales</Text>
          : proposals.map(proposal => <ProposalCard key={proposal.id} proposal={proposal} />)
        }
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={() => Logout({ navigation })} />
      </View>
    </ScrollView>
  );
};

const ProfileCard = ({ user }) => (
  <View style={styles.profileCard}>
    <Text>Email: {user.email}</Text>
    <Text>Telefono: {user.phone}</Text>
    <Text>Ubicación: {user.location}</Text>
    <Text>DNI: {user.dni}</Text>
    <Text>Nacimiento: {formatDate(user.birth)}</Text>
  </View>
);

const JobCard = ({ job }) => (
  <View style={styles.card}>
    <Text>Nombre del oficio: {job.category}</Text>
    <Text>Precio por hora: ${job.hourly_price}</Text>
    <Text>Ubicación: {job.location}</Text>
    <Text>Cantidad de empleados: {job.employees}</Text>
    <Text>Horas de atención: {job.attention_hours}</Text>
    <Text>Descripción: {job.description}</Text>
    <Text>Puntaje: {job.score}/5</Text>
  </View>
);

const ProposalCard = ({ proposal }) => (
  <View style={styles.card}>
    <Text>Categoría: {proposal.category}</Text>
    <Text>Presupuesto: ${proposal.budget}</Text>
    <Text>Ubicación: {proposal.location}</Text>
    <Text>Fecha de publicación: {formatDate(proposal.open_date.slice(0,10))}</Text>
    <Text>Descripción: {proposal.description}</Text>
  </View>
);

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
  profileCard: {
    backgroundColor: '#E5E7EB',
    padding: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#E5E7EB',
    padding: 10,
    marginBottom: 10,
  },
};

export default ProfileScreen;
