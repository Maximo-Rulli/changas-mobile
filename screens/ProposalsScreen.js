import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView } from 'react-native';
import { getProposals } from '../actions/getProposals';
import formatDate from '../utils/formatDate';

const ProposalsScreen = ({route}) => {
  const [proposals, setProposals] = useState(null)
  // Retrieve data from params
  const {category} = route.params

  useEffect(() => {
    async function loadProposals (){
      setProposals(await getProposals(category)); 
    }
    loadProposals();
  }, [])

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
