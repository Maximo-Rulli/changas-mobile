import supabase from '../libs/supabase/server'

export async function getJobs (IdUser, columns) {
  const { data } = await supabase.from('workers').select(columns).eq('id_user', IdUser)

  return data
}
