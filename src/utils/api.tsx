import axios, { InternalAxiosRequestConfig } from 'axios'
import { BASE_URL } from '../config/Config'

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config:InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401) {
    // Unauthorized, redirect to login
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
