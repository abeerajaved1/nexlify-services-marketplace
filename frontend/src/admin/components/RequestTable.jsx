import { useState } from 'react';
import api from '../../axiosInstance.js';
import '../../styles/RequestTable.css';

function RequestTable({ requests, onUpdateStatus }) {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = (id, status) => {
    setSelectedStatus(prev => ({ ...prev, [id]: status }));
  };

  const updateStatus = async (id) => {
    const newStatus = selectedStatus[id];
    if (!newStatus) return;

    setUpdatingId(id);
    try {
      await api.put(`/api/requests/${id}/status`, { status: newStatus });
      onUpdateStatus();
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      'pending': { bg: 'rgba(234, 179, 8, 0.1)', color: '#facc15', border: 'rgba(234, 179, 8, 0.2)' },
      'in-progress': { bg: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.2)' },
      'completed': { bg: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.2)' },
      'rejected': { bg: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: 'rgba(239, 68, 68, 0.2)' },
    };
    return styles[status] || { bg: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', border: 'rgba(148, 163, 184, 0.2)' };
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-emerald-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-blue-500',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <table className="request-table">
      <thead>
        <tr>
          <th style={{ width: '200px' }}>Client</th>
          <th style={{ width: '140px' }}>Service</th>
          <th>Message</th>
          <th style={{ width: '100px' }}>Method</th>
          <th style={{ width: '120px' }}>Status</th>
          <th style={{ width: '180px' }}>Update</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request, index) => {
          const currentStatus = selectedStatus[request._id] || request.status;
          const statusStyle = getStatusStyle(request.status);
          const avatarGradient = getAvatarColor(request.name || '');

          return (
            <tr key={request._id} style={{ animationDelay: `${index * 0.05}s` }}>
              <td>
                <div className="client-cell">
                  <div className={`client-avatar bg-gradient-to-br ${avatarGradient}`}>
                    {getInitials(request.name)}
                  </div>
                  <div className="client-info">
                    <span className="client-name">{request.name || 'Anonymous'}</span>
                    <span className="client-email">{request.email}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className="service-tag">{request.service || 'General'}</span>
              </td>
              <td>
                <p className="request-message">{request.message || '—'}</p>
              </td>
              <td>
                <span className="method-badge">
                  {request.contactMethod === 'whatsapp' ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      WhatsApp
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                      Email
                    </>
                  )}
                </span>
              </td>
              <td>
                <span 
                  className="status-badge"
                  style={{ 
                    background: statusStyle.bg, 
                    color: statusStyle.color,
                    borderColor: statusStyle.border 
                  }}
                >
                  <span className={`status-dot ${request.status}`}></span>
                  {request.status}
                </span>
              </td>
              <td>
                <div className="status-update-cell">
                  <div className="select-wrapper status-select-wrapper">
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(request._id, e.target.value)}
                      className={`status-select status-${currentStatus}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  <button 
                    onClick={() => updateStatus(request._id)} 
                    disabled={updatingId === request._id || currentStatus === request.status}
                    className={`update-btn ${updatingId === request._id ? 'loading' : ''}`}
                  >
                    {updatingId === request._id ? (
                      <span className="btn-spinner"></span>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        Update
                      </>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default RequestTable;