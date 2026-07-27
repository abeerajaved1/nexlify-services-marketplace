import { useState, useEffect } from 'react';
import api from '../../axiosInstance.js';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import '../../styles/Manager.css';
import '../../styles/LeadsManager.css';

const STATUS_LABELS = {
  new: 'New',
  analyzed: 'Analyzed',
  proposal_ready: 'Proposal Ready',
  contacted: 'Contacted',
  replied: 'Replied',
  meeting: 'Meeting',
  won: 'Won',
  lost: 'Lost',
};

function ScoreBadge({ score }) {
  let cls = 'score-badge low';
  if (score >= 70) cls = 'score-badge high';
  else if (score >= 40) cls = 'score-badge mid';
  return <span className={cls}>{score}</span>;
}

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{STATUS_LABELS[status] || status}</span>;
}

function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [urlsInput, setUrlsInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [batchResults, setBatchResults] = useState(null);

  const [discoverLocation, setDiscoverLocation] = useState('');
  const [discoverKeyword, setDiscoverKeyword] = useState('');
  const [discoverRadius, setDiscoverRadius] = useState(5000);
  const [discovering, setDiscovering] = useState(false);
  const [discoverInfo, setDiscoverInfo] = useState(null);

  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/automation/leads');
      setLeads(res.data.leads || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load leads.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLeads = async (e) => {
    e.preventDefault();
    const urls = urlsInput
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);

    if (urls.length === 0) return;

    setSubmitting(true);
    setBatchResults(null);
    setError(null);
    try {
      const res = await api.post('/api/automation/leads', { urls });
      setBatchResults(res.data.results || []);
      setUrlsInput('');
      fetchLeads();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze leads.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDiscoverLeads = async (e) => {
    e.preventDefault();
    if (!discoverLocation.trim() || !discoverKeyword.trim()) return;

    setDiscovering(true);
    setBatchResults(null);
    setDiscoverInfo(null);
    setError(null);
    try {
      const res = await api.post('/api/automation/leads/discover', {
        location: discoverLocation.trim(),
        keyword: discoverKeyword.trim(),
        radiusMeters: Number(discoverRadius),
      });
      setBatchResults(res.data.results || []);
      setDiscoverInfo(res.data.message || `Found ${res.data.foundCount ?? res.data.results?.length ?? 0} businesses with a listed website.`);
      fetchLeads();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to discover leads.');
    } finally {
      setDiscovering(false);
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
              <h1>Leads</h1>
              <p>Paste company website URLs you've found — the AI reads each site, scores the opportunity, and can draft a proposal and outreach email. Nothing gets sent until you approve it.</p>
            </div>
          </div>

          <form className="lead-add-form" onSubmit={handleDiscoverLeads}>
            <p className="lead-form-label">Find businesses by location (free, via OpenStreetMap)</p>
            <div className="discover-form-row">
              <input
                type="text"
                placeholder="Location, e.g. Lahore, Pakistan"
                value={discoverLocation}
                onChange={(e) => setDiscoverLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="Keyword, e.g. software house"
                value={discoverKeyword}
                onChange={(e) => setDiscoverKeyword(e.target.value)}
              />
              <select value={discoverRadius} onChange={(e) => setDiscoverRadius(e.target.value)}>
                <option value={2000}>2 km radius</option>
                <option value={5000}>5 km radius</option>
                <option value={10000}>10 km radius</option>
                <option value={20000}>20 km radius</option>
              </select>
              <button type="submit" className="btn-primary add-service-btn" disabled={discovering || !discoverLocation.trim() || !discoverKeyword.trim()}>
                {discovering ? 'Searching…' : 'Discover & Analyze'}
              </button>
            </div>
            <p className="lead-form-hint">
              Coverage depends on OpenStreetMap data for the area — great for many cities, not exhaustive like Google Maps. Only finds businesses that already listed a website on OSM.
            </p>
          </form>

          <form className="lead-add-form" onSubmit={handleAddLeads}>
            <textarea
              className="lead-url-textarea"
              placeholder={'One website URL per line, e.g.\nhttps://example-company.com\nhttps://another-company.com'}
              value={urlsInput}
              onChange={(e) => setUrlsInput(e.target.value)}
              rows={4}
            />
            <button type="submit" className="btn-primary add-service-btn" disabled={submitting || !urlsInput.trim()}>
              {submitting ? 'Analyzing…' : 'Analyze & Add Leads'}
            </button>
          </form>

          {discoverInfo && <p className="discover-info">{discoverInfo}</p>}

          {batchResults && (
            <div className="batch-results">
              {batchResults.map((r) => (
                <div key={r.url} className={`batch-result-row batch-${r.status}`}>
                  <span>{r.url}</span>
                  <span>{r.status === 'ok' ? `✅ added (score ${r.score})` : r.status === 'skipped' ? '↺ already exists' : `❌ ${r.reason}`}</span>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="manager-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <div className="table-section">
            {loading ? (
              <div className="manager-loader">
                <div className="loader-spinner"></div>
                <p>Loading leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="empty-state">
                <h3>No leads yet</h3>
                <p>Paste a few company URLs above to get started.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="manager-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th style={{ width: '90px' }}>Score</th>
                      <th>Status</th>
                      <th>Contact Email</th>
                      <th style={{ width: '100px' }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <LeadRow
                        key={lead._id}
                        lead={lead}
                        expanded={expandedId === lead._id}
                        onToggle={() => setExpandedId(expandedId === lead._id ? null : lead._id)}
                        onChanged={fetchLeads}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function LeadRow({ lead, expanded, onToggle, onChanged }) {
  return (
    <>
      <tr>
        <td>
          <span className="service-name">{lead.companyName}</span>
          <br />
          <a href={lead.website} target="_blank" rel="noreferrer" className="project-link">{lead.website}</a>
        </td>
        <td><ScoreBadge score={lead.analysis?.score || 0} /></td>
        <td><StatusBadge status={lead.status} /></td>
        <td>{lead.contactEmail || <span className="no-link">none found</span>}</td>
        <td>
          <button className="action-btn edit" onClick={onToggle} title="View details">
            {expanded ? 'Hide' : 'View'}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={5} style={{ padding: 0 }}>
            <LeadDetail lead={lead} onChanged={onChanged} />
          </td>
        </tr>
      )}
    </>
  );
}

function LeadDetail({ lead, onChanged }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [stage, setStage] = useState('proposal');

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';

  useEffect(() => {
    load();
  }, [lead._id]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/automation/leads/${lead._id}`);
      setDetail(res.data);
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to load details');
    } finally {
      setLoading(false);
    }
  };

  const generateProposal = async () => {
    setBusy(true);
    setErr(null);
    try {
      await api.post(`/api/automation/leads/${lead._id}/proposal`);
      await load();
      onChanged();
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to generate proposal');
    } finally {
      setBusy(false);
    }
  };

  const draftEmail = async () => {
    setBusy(true);
    setErr(null);
    try {
      await api.post(`/api/automation/leads/${lead._id}/email/draft`, { stage });
      await load();
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to draft email');
    } finally {
      setBusy(false);
    }
  };

  const updateEmail = async (id, subject, body) => {
    await api.patch(`/api/automation/email/${id}`, { subject, body });
    await load();
  };

  const sendEmail = async (id) => {
    if (!window.confirm('Send this email now? This actually delivers it via your Gmail account.')) return;
    setBusy(true);
    setErr(null);
    try {
      await api.post(`/api/automation/email/${id}/send`);
      await load();
      onChanged();
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to send email');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="lead-detail-panel">Loading…</div>;
  if (!detail) return <div className="lead-detail-panel">Could not load details.</div>;

  return (
    <div className="lead-detail-panel">
      {err && <div className="manager-error">{err}</div>}

      <div className="lead-detail-grid">
        <div>
          <h4>AI Analysis</h4>
          <p className="lead-summary">{lead.analysis?.summary || '—'}</p>
          {lead.analysis?.opportunities?.length > 0 && (
            <>
              <p className="lead-subheading">Opportunities</p>
              <ul>{lead.analysis.opportunities.map((o, i) => <li key={i}>{o}</li>)}</ul>
            </>
          )}
          {lead.analysis?.techObserved?.length > 0 && (
            <>
              <p className="lead-subheading">Observed</p>
              <ul>{lead.analysis.techObserved.map((o, i) => <li key={i}>{o}</li>)}</ul>
            </>
          )}
        </div>

        <div>
          <h4>Proposals</h4>
          {detail.proposals?.length === 0 && <p className="lead-summary">None yet.</p>}
          {detail.proposals?.map((p) => (
            <div key={p._id} className="proposal-row">
              <span>{p.title}</span>
              <a href={`${API_BASE}${p.pdfUrl}`} target="_blank" rel="noreferrer" className="project-link">View PDF</a>
            </div>
          ))}
          <button className="action-btn edit" disabled={busy} onClick={generateProposal}>
            {busy ? 'Working…' : 'Generate Proposal'}
          </button>
        </div>
      </div>

      <div className="lead-email-section">
        <h4>Outreach Emails</h4>
        {!lead.contactEmail && <p className="lead-summary">No contact email found for this lead — add one by editing the lead's notes, or find it manually and it will show up here once saved.</p>}

        <div className="email-draft-controls">
          <select value={stage} onChange={(e) => setStage(e.target.value)} disabled={!lead.contactEmail}>
            <option value="proposal">Initial proposal email</option>
            <option value="followup1">Follow-up #1</option>
            <option value="followup2">Follow-up #2 (final)</option>
          </select>
          <button className="action-btn edit" disabled={busy || !lead.contactEmail} onClick={draftEmail}>
            {busy ? 'Working…' : 'Draft with AI'}
          </button>
        </div>

        {detail.emails?.map((email) => (
          <EmailCard key={email._id} email={email} onUpdate={updateEmail} onSend={sendEmail} busy={busy} />
        ))}
      </div>
    </div>
  );
}

function EmailCard({ email, onUpdate, onSend, busy }) {
  const [subject, setSubject] = useState(email.subject);
  const [body, setBody] = useState(email.body);
  const [saved, setSaved] = useState(true);

  const isDraft = email.status === 'draft';

  return (
    <div className={`email-card status-${email.status}`}>
      <div className="email-card-header">
        <span className={`status-badge status-${email.status}`}>{email.status}</span>
        <span className="email-stage">{email.stage}</span>
      </div>
      <input
        className="email-subject-input"
        value={subject}
        disabled={!isDraft}
        onChange={(e) => { setSubject(e.target.value); setSaved(false); }}
      />
      <textarea
        className="email-body-textarea"
        rows={6}
        value={body}
        disabled={!isDraft}
        onChange={(e) => { setBody(e.target.value); setSaved(false); }}
      />
      {isDraft && (
        <div className="email-card-actions">
          <button
            className="action-btn edit"
            disabled={saved || busy}
            onClick={async () => { await onUpdate(email._id, subject, body); setSaved(true); }}
          >
            Save edits
          </button>
          <button className="action-btn delete" disabled={busy} onClick={() => onSend(email._id)}>
            Approve &amp; Send
          </button>
        </div>
      )}
      {email.status === 'failed' && <p className="lead-summary">Error: {email.errorMessage}</p>}
    </div>
  );
}

export default LeadsManager;