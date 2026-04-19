import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';

// Admin Imports
import AdminLogin from './admin/pages/AdminLogin.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import ServicesManager from './admin/pages/ServicesManager.jsx';
import ProjectsManager from './admin/pages/ProjectsManager.jsx';
import RequestsManager from './admin/pages/RequestsManager.jsx';
import ProtectedRoute from './admin/components/ProtectedRoute.jsx';
import AdminLayout from './admin/components/AdminLayout.jsx';

// PUBLIC LAYOUT — Header + Footer only on public pages
function PublicLayout() {
  return (
    <>
      <Header />
      <main className="public-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// ADMIN LAYOUT — No Header/Footer, uses AdminLayout sidebar
function AdminLayoutWrapper() {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES — With Header + Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ADMIN LOGIN — Standalone, no Header/Footer */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN ROUTES — Protected, uses AdminLayout */}
        <Route element={<AdminLayoutWrapper />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<ServicesManager />} />
          <Route path="/admin/projects" element={<ProjectsManager />} />
          <Route path="/admin/requests" element={<RequestsManager />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#020617',
            color: '#94a3b8'
          }}>
            404 - Page Not Found
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;