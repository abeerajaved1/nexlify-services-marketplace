// src/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor – add Authorization header if token exists in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – handle 401 by refreshing token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshResponse = await api.post('/api/admin/refresh');
        if (refreshResponse.data.success) {
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshErr) {
        console.error('Token refresh failed:', refreshErr);
        localStorage.removeItem('accessToken');
        // Redirect to login
        window.location.href = '/admin-login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;