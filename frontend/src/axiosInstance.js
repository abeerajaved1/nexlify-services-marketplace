// frontend/src/axiosInstance.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  // withCredentials: true, // REMOVED - causes CORS issues for chatbot
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Don't retry chatbot requests
    if (originalRequest.url?.includes('/api/chatbot/')) {
      return Promise.reject(error);
    }
    
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/api/admin/refresh')
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      const res = await api.post('/api/admin/refresh');
    
      if (res.data?.success && res.data?.accessToken) {
        localStorage.setItem('accessToken', res.data.accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      }
    
      throw new Error('Refresh failed');
    } catch (refreshError) {
      localStorage.removeItem('accessToken');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/admin-login';
      return Promise.reject(refreshError);
    }
  }
);

export default api;