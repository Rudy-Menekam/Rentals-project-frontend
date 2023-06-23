import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://localhost:3000/api/v1/login',
});

export default customFetch;
