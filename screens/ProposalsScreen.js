import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { getProposals } from '../actions/getProposals';
import formatDate from '../utils/formatDate';

const ProposalsScreen = ({ route }) => {
  const [proposals, setProposals] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Retrieve data from params
  const { category } = route.params;

  useEffect(() => {
    async function loadProposals() {
      const columns = 'budget, open_date, location, description'
      const fetchedProposals = await getProposals(category, 0, columns);
      setProposals(fetchedProposals);
      setLoading(false);
    }
    loadProposals();
  }, [category]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      {proposals ? (proposals.map((proposal, index) => (
        <View key={index}>
          <Text>Presupuesto: ${proposal.budget}</Text>
          <Text>Ubicación: {proposal.location}</Text>
          <Text>Fecha: {formatDate(proposal.open_date.slice(0, 10))}</Text> 
          <Text>Descripción: {proposal.description}</Text> 
        </View>
      )))
      : (
        <View>
          <Text>No hay ninguna oferta de {category}</Text> 
        </View>
      )
    }
    </ScrollView>
  );
};

export default ProposalsScreen;
