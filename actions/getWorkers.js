import supabase from '../libs/supabase/server'

export async function getWorkers (category, columns) {
  const { data } = await supabase.from('workers').select(columns).eq('category', category)

  return data
}
