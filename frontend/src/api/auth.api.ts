// frontend/src/api/auth.api.ts
import axios from 'axios';

// استفاده از import.meta.env در Vite
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// تنظیمات پایه axios
axios.defaults.withCredentials = true;

export const authAPI = {
  login: (credentials: { identifier: string; password: string }) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
  },
  
  register: (data: any) => {
    return axios.post(`${API_URL}/auth/register`, data);
  },
  
  logout: () => {
    return axios.post(`${API_URL}/auth/logout`);
  },
  
  getMe: () => {
    return axios.get(`${API_URL}/auth/me`);
  },
  
  updateProfile: (userData: Partial<any>) => {
    return axios.put(`${API_URL}/auth/profile`, userData);
  },
  
  refreshToken: () => {
    return axios.post(`${API_URL}/auth/refresh-token`);
  },
};