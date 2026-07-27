import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Import Landing Page (Single Scroll Page)
import LandingPage from './pages/LandingPage.jsx';

// Admin Imports
import AdminLogin from './admin/pages/AdminLogin.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import ServicesManager from './admin/pages/ServicesManager.jsx';
import ProjectsManager from './admin/pages/ProjectsManager.jsx';
import RequestsManager from './admin/pages/RequestsManager.jsx';
import LeadsManager from './admin/pages/LeadsManager.jsx';
import ProtectedRoute from './admin/components/ProtectedRoute.jsx';
import AdminLayout from './admin/components/AdminLayout.jsx';

// Import ChatWidget
import ChatWidget from './components/ChatWidget';

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="public-main">
        <Outlet />
      </main>
      <Footer />
      
      {/* Chat Widget - visible on all public pages */}
      <ChatWidget />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SINGLE SCROLL LANDING PAGE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<ServicesManager />} />
          <Route path="/admin/projects" element={<ProjectsManager />} />
          <Route path="/admin/requests" element={<RequestsManager />} />
          <Route path="/admin/leads" element={<LeadsManager />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#0a0a0a',
            color: '#888888',
            fontFamily: 'Inter, sans-serif'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '6rem', color: '#b87333', marginBottom: '1rem' }}>404</h1>
              <p style={{ fontSize: '1.2rem', color: '#f5f5f5' }}>Page Not Found</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;