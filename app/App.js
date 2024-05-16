import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createClient } from '@supabase/supabase-js';

export default async function App() {
  console.log('Hasta acá todo fue bien!')
  const supabase = createClient(process.NEXT_PUBLIC_SUPABASE_URL, process.SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
  const {data}  = await supabase.from('users').select('*').eq('email', 'rullimaximoeduardo@gmail.com').single()
  console.log(data)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
