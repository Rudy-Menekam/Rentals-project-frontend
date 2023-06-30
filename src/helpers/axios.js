import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://vespa-rentals.onrender.com',
});

export default customFetch;
