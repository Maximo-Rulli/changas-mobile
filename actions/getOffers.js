import supabase from '../libs/supabase/server'

export async function getOffers (IdUser, columns) {
  const { data } = await supabase.from('proposals').select(columns).eq('id_user', IdUser)

  return data
}
