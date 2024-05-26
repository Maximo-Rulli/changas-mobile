import supabase from '../libs/supabase/server'

export async function getCategories (columns) {
  const { data } = await supabase.from('categories').select(columns)

  return data
}
