import supabase from '../libs/supabase/server'

export async function getContract (IdContract, columns) {
  const { data } = await supabase.from('contracts').select(columns)
    .eq('id_contract', IdContract).single()

  return data
}
