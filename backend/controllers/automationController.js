// backend/controllers/automationController.js
const path = require('path');
const Lead = require('../models/Lead');
const Proposal = require('../models/Proposal');
const EmailLog = require('../models/EmailLog');
const { analyzeLeadFromUrl } = require('../automation/leadAnalyzer');
const { discoverBusinesses } = require('../automation/businessDiscovery');
const { generateProposal } = require('../automation/proposalGenerator');
const { draftEmail, sendEmail } = require('../automation/emailAutomation');
const config = require('../config');

// Shared by both "paste URLs" and "discover by location" — analyzes each URL
// and saves it as a Lead, skipping ones already in the database.
async function analyzeAndSaveUrls(urls) {
  const results = [];
  for (const url of urls) {
    try {
      const data = await analyzeLeadFromUrl(url);
      const existing = await Lead.findOne({ website: data.website });
      if (existing) {
        results.push({ url, status: 'skipped', reason: 'already exists', leadId: existing._id });
        continue;
      }
      const lead = await Lead.create({ ...data, status: 'analyzed' });
      results.push({ url, status: 'ok', leadId: lead._id, score: lead.analysis.score });
    } catch (err) {
      results.push({ url, status: 'failed', reason: err.message });
    }
  }
  return results;
}

// POST /api/automation/leads  { urls: ["https://...", ...] }
// You supply the URLs (from a Google/Clutch/Maps/LinkedIn search you did yourself) —
// the AI does the reading, analysis, scoring, and proposal writing from there.
exports.addLeadsFromUrls = async (req, res) => {
  try {
    const { urls } = req.body;
    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ success: false, message: 'Provide an array of URLs' });
    }
    if (urls.length > 20) {
      return res.status(400).json({ success: false, message: 'Max 20 URLs per batch (keep it light)' });
    }

    const results = await analyzeAndSaveUrls(urls);
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/automation/leads/discover  { location, keyword, radiusMeters, limit }
// Finds real businesses near a location using free OpenStreetMap data, then
// runs each one through the same analysis pipeline as addLeadsFromUrls.
exports.discoverLeads = async (req, res) => {
  try {
    const { location, keyword, radiusMeters, limit } = req.body;
    if (!location || !keyword) {
      return res.status(400).json({ success: false, message: 'Provide both location and keyword' });
    }

    const businesses = await discoverBusinesses({
      location,
      keyword,
      radiusMeters: Math.min(radiusMeters || 5000, 20000), // cap at 20km, keep it light
      limit: Math.min(limit || 15, 20),
    });

    if (businesses.length === 0) {
      return res.json({
        success: true,
        results: [],
        message: 'No businesses with a listed website were found for that search. Try a wider radius, a different keyword, or a bigger nearby city.',
      });
    }

    const urls = businesses.map((b) => b.website);
    const results = await analyzeAndSaveUrls(urls);

    // attach the business name OSM gave us, useful even for ones that failed analysis
    const enriched = results.map((r, i) => ({ ...r, discoveredName: businesses[i]?.name }));

    res.json({ success: true, results: enriched, foundCount: businesses.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/automation/leads
exports.listLeads = async (req, res) => {
  const leads = await Lead.find().sort({ 'analysis.score': -1, addedAt: -1 });
  res.json({ success: true, leads });
};

// GET /api/automation/leads/:id
exports.getLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
  const proposals = await Proposal.find({ lead: lead._id }).sort({ createdAt: -1 });
  const emails = await EmailLog.find({ lead: lead._id }).sort({ createdAt: -1 });
  res.json({ success: true, lead, proposals, emails });
};

// PATCH /api/automation/leads/:id  { status, notes }
exports.updateLead = async (req, res) => {
  const { status, notes } = req.body;
  const update = {};
  if (status) update.status = status;
  if (notes !== undefined) update.notes = notes;
  const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
  res.json({ success: true, lead });
};

// POST /api/automation/leads/:id/proposal
exports.createProposal = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    const { content, pdfUrl } = await generateProposal(lead);

    const proposal = await Proposal.create({
      lead: lead._id,
      title: content.title,
      content,
      pdfUrl,
    });

    lead.status = 'proposal_ready';
    await lead.save();

    res.json({ success: true, proposal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/automation/leads/:id/email/draft  { stage: 'proposal'|'followup1'|'followup2' }
exports.draftLeadEmail = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    if (!lead.contactEmail) {
      return res.status(400).json({ success: false, message: 'This lead has no contact email on file yet' });
    }

    const stage = req.body.stage || 'proposal';
    const { subject, body } = await draftEmail(lead, stage);

    const emailLog = await EmailLog.create({
      lead: lead._id,
      direction: 'outbound',
      stage,
      subject,
      body,
      status: 'draft',
    });

    res.json({ success: true, email: emailLog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/automation/email/:id  { subject, body }
// Let the admin edit the AI's draft before sending.
exports.editDraftEmail = async (req, res) => {
  const { subject, body } = req.body;
  const emailLog = await EmailLog.findById(req.params.id);
  if (!emailLog) return res.status(404).json({ success: false, message: 'Email not found' });
  if (emailLog.status !== 'draft') {
    return res.status(400).json({ success: false, message: 'Only drafts can be edited' });
  }
  if (subject !== undefined) emailLog.subject = subject;
  if (body !== undefined) emailLog.body = body;
  await emailLog.save();
  res.json({ success: true, email: emailLog });
};

// POST /api/automation/email/:id/send
// This is the one manual click that actually sends anything — the approval gate.
exports.approveAndSend = async (req, res) => {
  try {
    const emailLog = await EmailLog.findById(req.params.id).populate('lead');
    if (!emailLog) return res.status(404).json({ success: false, message: 'Email not found' });
    if (emailLog.status === 'sent') {
      return res.status(400).json({ success: false, message: 'Already sent' });
    }

    // If this is the proposal-stage email, attach the latest proposal PDF automatically
    let attachmentPath;
    if (emailLog.stage === 'proposal') {
      const latestProposal = await Proposal.findOne({ lead: emailLog.lead._id }).sort({ createdAt: -1 });
      if (latestProposal?.pdfUrl) {
        attachmentPath = path.join(__dirname, '..', latestProposal.pdfUrl.replace('/uploads', config.uploadDir));
      }
    }

    await sendEmail({
      to: emailLog.lead.contactEmail,
      subject: emailLog.subject,
      body: emailLog.body,
      attachmentPath,
    });

    emailLog.status = 'sent';
    emailLog.sentAt = new Date();
    await emailLog.save();

    emailLog.lead.status = 'contacted';
    await emailLog.lead.save();

    res.json({ success: true, email: emailLog });
  } catch (err) {
    const emailLog = await EmailLog.findById(req.params.id);
    if (emailLog) {
      emailLog.status = 'failed';
      emailLog.errorMessage = err.message;
      await emailLog.save();
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/automation/emails
exports.listEmails = async (req, res) => {
  const emails = await EmailLog.find().populate('lead', 'companyName website').sort({ createdAt: -1 });
  res.json({ success: true, emails });
};