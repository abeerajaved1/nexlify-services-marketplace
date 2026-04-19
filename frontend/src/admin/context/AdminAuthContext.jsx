// src/admin/context/AdminAuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../../axiosInstance.js';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/api/admin/me');
        setAdmin(res.data.user || { role: 'admin' });
      } catch (err) {
        // silent fail on initial check is ok
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/admin/login', { email, password });
      if (res.data.success) {
        const meRes = await api.get('/api/admin/me');
        setAdmin(meRes.data.user || { role: 'admin' });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login attempt failed:', err?.response?.data || err.message);
      throw err;   // ← let AdminLogin.jsx catch and show better message
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/admin/logout');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setAdmin(null);
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