import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuthContext';
import '../../styles/AdminHeader.css';
import logo from '../../assets/logo.png';

function AdminHeader() {
  const location = useLocation();
  const { logout } = useContext(AdminAuthContext);

  const pageTitles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/services': 'Manage Services',
    '/admin/projects': 'Manage Projects',
    '/admin/requests': 'Service Requests',
    '/admin/leads': 'Leads',
  };

  const title = pageTitles[location.pathname] || 'Admin';

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <img src={logo} alt="Axenro" className="header-logo-mobile" />
        <h2 className="header-page-title">{title}</h2>
      </div>
      <div className="admin-header-right">
        <button className="header-icon-btn" title="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="header-notif-dot"></span>
        </button>
        <div className="header-divider"></div>
        <button onClick={logout} className="header-logout-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" x2="9" y1="12" y2="12"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;