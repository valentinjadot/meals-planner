import axios from 'axios';

export default async function hitEndpoint(query, payload, type = 'get') {
  try {
    const { data } = await axios[type](query, payload);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
}
