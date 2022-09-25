import supabaseClient from '../config/supabase';

export default async function updateOrder(id, changesToOrder) {
  const { data, error } = await supabaseClient
    .from('orders')
    .update(changesToOrder)
    .match({ id });

  console.log(data);

  return !!error;
}
