import axios from 'axios';

const baseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_BASE_URL;
  }
  return '';
};

export default async function hitEndpoint(query, payload, type = 'get') {
  try {
    const url = baseUrl() + query;
    const { data } = await axios[type](url, payload);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
}
