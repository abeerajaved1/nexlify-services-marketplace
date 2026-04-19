import { useState, useEffect } from 'react';
import api from '../../axiosInstance.js';
import ServiceForm from '../components/ServiceForm';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import '../../styles/Manager.css';

function ServicesManager() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, [page, search]);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/services', {
        params: { page, search, limit: 10 },
      });
      const data = res.data || {};
      const serviceList = Array.isArray(data.services) ? data.services : [];
      setServices(serviceList);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to load services:', err);
      setError(err.response?.data?.message || 'Failed to load services.');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      if (data.imageUrl) formData.append('imageUrl', data.imageUrl);
      if (data.image?.[0]) formData.append('image', data.image[0]);

      if (editingId) {
        await api.put(`/api/services/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/api/services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchServices();
      setEditingId(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save service: ' + (err.response?.data?.message || err.message));
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) return;
    try {
      await api.delete(`/api/services/${id}`);
      fetchServices();
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <div className="manager-header">
            <div>
              <h1>Manage Services</h1>
              <p>Add, edit, or remove your service offerings.</p>
            </div>
            <button 
              className="btn-primary add-service-btn"
              onClick={() => {
                setEditingId(null);
                document.getElementById('service-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="M12 5v14"/>
              </svg>
              Add Service
            </button>
          </div>

          <div className="manager-search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search services by name..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
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

          <div id="service-form" className="form-section">
            <ServiceForm
              onSubmit={handleSubmit}
              defaultValues={editingId ? services.find(s => s._id === editingId) || {} : {}}
              isEditing={!!editingId}
              onCancel={() => setEditingId(null)}
            />
          </div>

          <div className="table-section">
            {loading ? (
              <div className="manager-loader">
                <div className="loader-spinner"></div>
                <p>Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m7.5 4.27 9 5.15"/>
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                    <path d="m3.3 7 8.7 5 8.7-5"/>
                    <path d="M12 22V12"/>
                  </svg>
                </div>
                <h3>No services found</h3>
                <p>{search ? 'Try adjusting your search terms.' : 'Add your first service using the form above.'}</p>
              </div>
            ) : (
              <>
                <div className="table-container">
                  <table className="manager-table">
                    <thead>
                      <tr>
                        <th style={{ width: '100px' }}>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th style={{ width: '140px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr key={service._id} style={{ animationDelay: `${index * 0.05}s` }}>
                          <td>
                            <div className="service-image-cell">
                              {service.image ? (
                                <img
                                  src={`http://localhost:5000${service.image}`}
                                  alt={service.name}
                                  onError={(e) => {
                                    e.target.src = 'https://placehold.co/80x80/1e293b/475569?text=Error';
                                  }}
                                />
                              ) : (
                                <div className="image-placeholder">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                    <circle cx="9" cy="9" r="2"/>
                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className="service-name">{service.name}</span>
                          </td>
                          <td>
                            <p className="service-desc">{service.description?.substring(0, 120) || '—'}</p>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                onClick={() => setEditingId(service._id)}
                                className="action-btn edit"
                                title="Edit service"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                  <path d="m15 5 4 4"/>
                                </svg>
                              </button>
                              <button 
                                onClick={() => deleteService(service._id)}
                                className="action-btn delete"
                                title="Delete service"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18"/>
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                  <line x1="10" x2="10" y1="11" y2="17"/>
                                  <line x1="14" x2="14" y1="11" y2="17"/>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="manager-pagination">
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
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
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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

export default ServicesManager;