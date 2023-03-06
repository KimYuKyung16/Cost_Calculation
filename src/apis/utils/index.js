import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   headers: { 'X-Custom-Header': 'foobar' },
//   timeout: 1000,
// });

const BASE_URL = 'http://localhost:6001';

export const defaultApi = axios.create({
    baseURL: BASE_URL
})