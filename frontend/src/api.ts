// src/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4001',
});

export const admin_api = axios.create({
  baseURL: 'http://localhost:4002',
});

admin_api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const user_api = axios.create({
  baseURL: 'http://localhost:4002',
});

user_api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const comment_api = axios.create({
  baseURL: 'http://localhost:4007',
});

comment_api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});