import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

const useFetchUser = () => {
  const [username, setUsername] = useState('');
  const [id_user, setIdUser] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const username_data = await SecureStore.getItemAsync('username');
        setUsername(username_data);
        const id_data = await SecureStore.getItemAsync('id_user');
        setIdUser(id_data);
      } catch (e) {
        Alert.alert('Error', 'Error al recuperar datos del usuario');
      }
    }
    fetchUser();
  }, []);

  return {username, id_user};
};

export default useFetchUser;
