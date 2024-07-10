
import axios from 'axios';

const token = sessionStorage.getItem('token');

export const axiosInstance = axios.create({
  baseURL: 'https://entertainment-app-capstone-server.onrender.com/api',
  // baseURL: 'http://localhost:8000/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include token in Authorization header if it exists
  },
});

