import { useEffect, useState } from 'react';
import supabaseClient from '../config/supabase';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((current) => !current);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabaseClient
      .from('users')
      .select()
      .order('name');

    console.log('fetchUsers', data);
    error && console.error('fetchUsers', error);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  return [users, triggerReload];
}
