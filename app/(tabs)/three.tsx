import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { createClient } from '@supabase/supabase-js';

export default async function TabTwoScreen() {
  const NEXT_PUBLIC_SUPABASE_URL='https://acojrajsmjhmynvtuqky.supabase.co'
  const SUPABASE_SERVICE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjb2pyYWpzbWpobXludnR1cWt5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTE0MDcwNiwiZXhwIjoyMDI2NzE2NzA2fQ.asmu2yye0hRQ9EGIlLb7boJhTrfoheoPKYZ8lqMutk4'
  const JWT_SECRET="/vVVv5DZDCB1NEl482N8eJQBD1bRQLsJ/97Fjst2iNL8H+elEHQ76zrhlFUZ0Ipo+f+ewRnyev180ghpN2BOqQ=="
  console.log('Hasta acá todo fue bien!')
  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
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
      <Text style={styles.title}>Tab THREE Perro</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/estamos en la tres.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
