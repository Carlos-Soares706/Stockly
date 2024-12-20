import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.106:5000/api', // Use o seu IPv4 aqui
});

export default api;
