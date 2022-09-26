import hitEndpoint from '../utils/hitEndpoint';

export default async function createUser(props) {
  const data = hitEndpoint('/users', { ...props }, 'post');
  console.log('dataAfterUserCreate', data);
  return data;
}