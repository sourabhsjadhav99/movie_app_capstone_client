
import axios from 'axios';

const token = sessionStorage.getItem('token');

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include token in Authorization header if it exists
  },
});
