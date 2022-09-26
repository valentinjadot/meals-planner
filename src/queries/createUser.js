import hitEndpoint from '../utils/hitEndpoint';

export default async function createUser(props) {
  const data = hitEndpoint('/users', { user: { ...props } }, 'post');
  return data;
}
