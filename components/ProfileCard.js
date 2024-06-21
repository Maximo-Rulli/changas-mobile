import React from 'react'
import { Text, View } from 'react-native'
import formatDate from '../utils/formatDate'

const ProfileCard = ({ user }) => (
    <View style={styles.profileCard}>
        {user.email ? <Text>Email: {user.email}</Text> :  undefined}
        {user.phone ? <Text>Telefono: {user.phone}</Text> : undefined}
        <Text>Ubicación: {user.location}</Text>
        {user.dni ? <Text>DNI: {user.dni}</Text> : undefined}
        <Text>Nacimiento: {formatDate(user.birth)}</Text>
    </View>
)

const styles = {
    profileCard: {
        backgroundColor: '#E5E7EB',
        padding: 10,
        marginBottom: 20,
    }
}

export default ProfileCard