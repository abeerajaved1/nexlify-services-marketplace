import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuthContext';

export default function ProtectedRoute() {
  const { admin, loading } = useContext(AdminAuthContext);

  if (loading) {
    return <div className="text-center p-10 text-gray-600">Authenticating...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}