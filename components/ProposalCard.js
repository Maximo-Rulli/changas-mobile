import React from 'react'
import { Text, View } from 'react-native'
import formatDate from '../utils/formatDate'

const ProposalCard = ({ proposal }) => (
    <View style={styles.card}>
        <Text>Categoría: {proposal.category}</Text>
        <Text>Presupuesto: ${proposal.budget}</Text>
        <Text>Ubicación: {proposal.location}</Text>
        <Text>Fecha de publicación: {formatDate(proposal.open_date.slice(0,10))}</Text>
        <Text>Descripción: {proposal.description}</Text>
    </View>
)

const styles = {
    card: {
      backgroundColor: '#E5E7EB',
      padding: 10,
      marginBottom: 10,
    },
}

export default ProposalCard