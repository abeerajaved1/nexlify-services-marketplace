import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import DashboardStats from '../components/DashboardStats';
import api from '../../axiosInstance.js';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    totalProjects: 0,
    totalServices: 0,
    requestsPerService: [],
    projectsPerCategory: [],
    requestsOverTime: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [requestsRes, projectsRes, servicesRes] = await Promise.all([
          axios.get('/api/requests'),
          axios.get('/api/projects'),
          axios.get('/api/services'),
        ]);

        const requestsPerService = processRequestsPerService(requestsRes.data);
        const projectsPerCategory = processProjectsPerCategory(projectsRes.data);
        const requestsOverTime = processRequestsOverTime(requestsRes.data);

        setStats({
          totalRequests: requestsRes.data.length,
          totalProjects: projectsRes.data.length,
          totalServices: servicesRes.data.length,
          requestsPerService,
          projectsPerCategory,
          requestsOverTime,
        });
      } catch (err) {
        console.error('Error fetching stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const processRequestsPerService = (requests) => {
    return [];
  };

  const processProjectsPerCategory = (projects) => {
    return [];
  };

  const processRequestsOverTime = (requests) => {
    return [];
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-loader">
          <div className="loader-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <div className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back, here's what's happening today.</p>
            </div>
          </div>
          <DashboardStats stats={stats} />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;