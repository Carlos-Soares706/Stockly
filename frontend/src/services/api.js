import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_ENDERECO_BACKEND:PORTA', // Ajuste aqui
});

export default api;
