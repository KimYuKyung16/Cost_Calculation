import axios from 'axios';

const BASE_URL = 'http://localhost:6001'; // 나중에 환경변수로 바꾸기

const defaultApi = axios.create({ // 인증X
    baseURL: BASE_URL,
    headers: { "Content-Type": 'application/json' },
    withCredentials: true
})

const token = localStorage.getItem('accessToken'); 
const authApi = axios.create({ // 인증O
    baseURL: BASE_URL,
    headers: { Authorization: token },
    timeout: 1000,
    withCredentials: true
})

export const defaultInstance = defaultApi;
export const authInstance = authApi; 