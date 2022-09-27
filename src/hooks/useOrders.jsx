import { useEffect, useState } from 'react';
import _ from 'lodash';
import getUsers from '../queries/getOrder';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((current) => !current);
  };

  const fetchOrders = async () => {
    const data = await getUsers();
    if (data) {
      setOrders(
        data,
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [reload]);

  return [orders, triggerReload];
}
