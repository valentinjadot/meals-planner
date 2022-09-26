import { useEffect, useState } from 'react';

import createMissingOrders from '../queries/createMissingOrders';

export default function useCreateMissingOrders(users, orders) {
  const [newOrders, setNewOrders] = useState(false);

  const createOrders = async () => {
    const createdOrders = await createMissingOrders(users, orders);
    setNewOrders(createdOrders);
  };

  useEffect(() => {
    createOrders();
  }, [users]);

  return [newOrders];
}
