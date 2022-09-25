import { useEffect, useState } from 'react';

import createMissingOrders from '../queries/createMissingOrders';

export default function useCreateMissingOrders(users, usersOrders) {
  const [newOrders, setNewOrders] = useState(false);

  const createOrders = async () => {
    const createdOrders = await createMissingOrders(users, usersOrders);
    setNewOrders(createdOrders);
  };

  useEffect(() => {
    createOrders();
  }, [users]);

  return [newOrders];
}
