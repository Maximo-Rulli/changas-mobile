import supabase from '../libs/supabase/server'

export async function getProposals (category) {
  const { data } = await supabase.from('proposals').select().eq('category', category)

  return data
}
