import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.178:3000', // Cambia con l'indirizzo del tuo backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
