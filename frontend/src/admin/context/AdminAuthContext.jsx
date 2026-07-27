import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import api from '../../axiosInstance.js';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Prevent multiple simultaneous auth checks
  const isChecking = useRef(false);

  const checkAuth = useCallback(async () => {
    // Prevent duplicate checks
    if (isChecking.current) return;
    isChecking.current = true;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.log('No accessToken in localStorage');
        setAdmin(null);
        setLoading(false);
        isChecking.current = false;
        return;
      }

      const res = await api.get('/api/admin/me');
      setAdmin(res.data.user || { role: 'admin' });
    } catch (err) {
      // 401 will be handled by axios interceptor (refresh or redirect)
      if (err.response?.status !== 401) {
        console.error('Auth check error:', err);
      }
      setAdmin(null);
    } finally {
      setLoading(false);
      isChecking.current = false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/admin/login', { email, password });
      
      if (res.data.success && res.data.accessToken) {
        // Store access token in localStorage
        localStorage.setItem('accessToken', res.data.accessToken);
        
        // Set default header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
        
        // Fetch admin data
        const meRes = await api.get('/api/admin/me');
        setAdmin(meRes.data.user || { role: 'admin' });
        
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Login attempt failed:', err?.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/admin/logout');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.removeItem('accessToken');
      delete api.defaults.headers.common['Authorization'];
      setAdmin(null);
      window.location.href = '/admin-login';
    }
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};