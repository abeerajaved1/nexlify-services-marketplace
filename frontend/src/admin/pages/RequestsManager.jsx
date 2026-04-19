import { useState, useEffect } from 'react';
import api from '../../axiosInstance.js';
import RequestTable from '../components/RequestTable.jsx';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import '../../styles/Manager.css';

function RequestsManager() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [page, search]);

  // Auto-clear success message
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await api.get('/api/requests', {
        params: { page, search, limit: 10 },
      });
      const data = res.data || {};
      setRequests(data.requests || data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to load requests:', err);
      setError(
        err.response?.data?.message ||
        'Failed to load requests. Please re-login or check server.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = () => {
    setSuccessMsg('Status updated successfully!');
    fetchRequests();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <div className="manager-header">
            <div>
              <h1>Service Requests</h1>
              <p>Manage incoming client inquiries and track their status.</p>
            </div>
            <button onClick={fetchRequests} className="btn-primary refresh-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                <path d="M16 16h5v5"/>
              </svg>
              Refresh
            </button>
          </div>

          <div className="manager-search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, service..."
              value={search}
              onChange={handleSearchChange}
              className="manager-search"
            />
            {search && (
              <button className="search-clear" onClick={() => { setSearch(''); setPage(1); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            )}
          </div>

          {error && (
            <div className="manager-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {successMsg && (
            <div className="manager-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {successMsg}
            </div>
          )}

          <div className="table-section">
            {loading ? (
              <div className="manager-loader">
                <div className="loader-spinner"></div>
                <p>Loading requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <h3>No requests found</h3>
                <p>{search ? 'Try adjusting your search terms.' : 'Submit a request from the public contact page to see it here.'}</p>
              </div>
            ) : (
              <>
                <div className="table-container request-table-container">
                  <RequestTable requests={requests} onUpdateStatus={handleStatusUpdate} />
                </div>

                {totalPages > 1 && (
                  <div className="manager-pagination">
                    <button
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="pagination-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        disabled={page === i + 1}
                        className={`pagination-btn ${page === i + 1 ? 'active' : ''}`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={page === totalPages}
                      className="pagination-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default RequestsManager;