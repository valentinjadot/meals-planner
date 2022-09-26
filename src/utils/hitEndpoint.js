import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default async function hitEndpoint(query, payload, type = 'get') {
  try {
    const url = baseUrl + query;
    console.log(url);
    const { data } = await axios[type](url, payload);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
}
