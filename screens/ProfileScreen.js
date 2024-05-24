import React from 'react';
import {Text, View, Button, StyleSheet } from 'react-native';
import useFetchUser from '../hooks/useFetchUser';


const ProfileScreen = ({navigation}) => {
  const {username, id_user} = useFetchUser();
  
  return (
    <View>
      <Text>  Bienvenido a tu perfil {username}!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={() => Logout({navigation})} />
      </View>
      <Text>  Bienvenido a tu perfil {username}!</Text>
      <Text>  Bienvenido a tu perfil {username}!</Text>
      <Text>  Bienvenido a tu perfil {username}!</Text>
      <Text>  Bienvenido a tu perfil {username}!</Text>
      <Text>  Bienvenido a tu perfil {username}!</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
});

export default ProfileScreen;
