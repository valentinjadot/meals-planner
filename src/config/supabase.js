import { createClient } from '@supabase/supabase-js';

const options = {
  schema: 'public',
  persistSession: true,
  detectSessionInUrl: true,
};
const supabaseClient = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_KEY,
  options,
);

export default supabaseClient;
