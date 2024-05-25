import supabase from '../libs/supabase/server'

export async function getWorkers (category) {
  const { data } = await supabase.from('workers').select().eq('category', category)

  return data
}
