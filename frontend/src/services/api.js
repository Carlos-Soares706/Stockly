import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajustar para o endereço do backend
});

export default api;
