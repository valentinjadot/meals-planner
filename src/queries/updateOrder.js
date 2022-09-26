import hitEndpoint from '../utils/hitEndpoint';

export default async function updateOrder({ orderId, changesToOrder }) {
  const data = hitEndpoint(`/orders/${orderId}`, { order: changesToOrder }, 'patch');
  return data;
}
