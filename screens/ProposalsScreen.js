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
      const fetchedProposals = await getProposals(category, 0);
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
      {proposals && proposals.map((proposal) => (
        <View key={proposal.id_proposal}>
          <Text>Fecha: {formatDate(proposal.open_date.slice(0, 10))}</Text> 
          <Text>Cotización: ${proposal.budget}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ProposalsScreen;
