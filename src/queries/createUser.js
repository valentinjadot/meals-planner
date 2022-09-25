import supabaseClient from '../config/supabase';

export default async function createUser(props) {
  const { name, isVegan, isFin } = props;
  const { data, error } = await supabaseClient
    .from('users')
    .insert([
      {
        name,
        is_vegan: isVegan,
        is_fin: isFin,
      },
    ]);

  return !!error;
}
