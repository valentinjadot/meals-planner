import _ from 'lodash';
import orderDate from '../utils/orderDate';
import supabaseClient from '../config/supabase';

const newOrders = (users) => users.map((user) => (
  {
    user_id: user.id,
    is_take_away: false,
    is_vegan: user.is_vegan,
    execution_date: (orderDate().toISOString()).toLocaleString('es-CL'),
  }
));

const insertNewOrdersFor = async (users) => {
  const orders = newOrders(users);

  const { data, error } = await supabaseClient
    .from('orders')
    .insert(orders);
  return data;
};

const findUsersWithoutOrders = (users, usersOrders) => {
  const usersIdWithoutOrders = _.difference(
    users.map((user) => user.id),
    usersOrders?.map((userOrder) => userOrder.users.id),
  );
  return users.filter((user) => usersIdWithoutOrders.includes(user.id));
};

export default async function createMissingOrders(users, usersOrders) {
  let insertedOrders;

  const userWithoutOrders = findUsersWithoutOrders(users, usersOrders);
  if (userWithoutOrders?.length > 0) {
    console.warn('userWithoutOrders', userWithoutOrders);
    insertedOrders = await insertNewOrdersFor(userWithoutOrders);
  }
  return insertedOrders;
}
