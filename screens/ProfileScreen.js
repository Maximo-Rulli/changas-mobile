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
  const [user, setUser] = useState({ email: null, phone: null, location: null, birth: null, dni: null });
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
    <ScrollView>
      <Text>Bienvenido a tu perfil {username}!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={() => Logout({ navigation })} />
      </View>
      <Text>{user.email}</Text>
      <Text>Telefono: {user.phone}</Text>
      <Text>Ubicación: {user.location}</Text>
      <Text>DNI: {user.dni}</Text>
      <Text>{formatDate(user.birth)}</Text>

      <Text>Profesiones registradas</Text>
      {jobs && jobs.map((job) => (
        <View key={job.id_worker}>
          <Text>{job.category}</Text>
          <Text>Cotización: ${job.hourly_price}</Text>
          <Text>Ubicación: {job.location}</Text>
          <Text>N° de empleados: {job.employees}</Text>
          <Text>Horas de atención: {job.attention_hours}</Text>
          <Text>Descripción: {job.description}</Text>
          <Text>Puntaje: {job.score}/5</Text>
        </View>
      ))}

      
      <Text>Ofertas laborales publicadas</Text>
      {proposals && proposals.map((proposal) => (
        <View key={proposal.id_proposal}>
          <Text>{proposal.category}</Text>
          <Text>Presupuesto: {proposal.budget}</Text>
          <Text>Ubicación: {proposal.location}</Text>
          <Text>Fecha de publicación: {formatDate(proposal.open_date.slice(0, 10))}</Text>
          <Text>Descripción: {proposal.description}</Text>
        </View>
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
});

export default ProfileScreen;
