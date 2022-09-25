import { useEffect, useState } from 'react';
import _ from 'lodash';
import supabaseClient from '../config/supabase';

export default function useUsersOrders(users) {
  const [usersOrders, setUsersOrders] = useState([]);
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((current) => !current);
  };

  const fetchUsersOrders = async () => {
    const { data, error } = await supabaseClient
      .from('orders')
      .select(`
        id,
        users (
          id,
          name,
          is_fin,
          is_vegan
        ),
        is_vegan,
        is_take_away,
        is_valid,
        execution_date
      `);

    console.log('fetchUsersOrders', data);
    error && console.error('fetchUsersOrders', error);
    const sortedData = _.sortBy(data, (userOrder) => userOrder.users.name);
    setUsersOrders(sortedData);
  };

  useEffect(() => {
    fetchUsersOrders();
  }, [users, reload]);

  return [usersOrders, triggerReload];
}
