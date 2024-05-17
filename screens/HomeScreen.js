import {NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY} from '@env';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

/*
export default function HomeApp() {
  console.log('Hasta acá todo fue bien!')
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
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
      <Text>Llegamos acá gracias a la navegación</Text>
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
*/

const HomeScreen = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      });
      const result = await supabase.from('users').select('*').eq('email', 'rullimaximoeduardo@gmail.com').single();
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Llegamos acá gracias a la navegación!</Text>
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
};

export default HomeScreen;