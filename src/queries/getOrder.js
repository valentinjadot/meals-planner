import hitEndpoint from '../utils/hitEndpoint';

export default async function getUsers() {
  const data = await hitEndpoint('/orders');
  return data;
}
