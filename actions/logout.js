import * as SecureStore from 'expo-secure-store';

export default async function Logout({navigation}){
    await SecureStore.deleteItemAsync('id_user');
    await SecureStore.deleteItemAsync('username');
    // Reset the stack as the user just logged out and cannot go back
    navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
}
