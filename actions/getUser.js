import supabase from '../libs/supabase/server'

export async function getUser (IdUser, columns) {
  const { data: user } = await supabase.from('users_data').select(columns).eq('id_user', IdUser).single()

  return user
}
