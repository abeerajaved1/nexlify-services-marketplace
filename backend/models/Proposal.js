// backend/models/Proposal.js
const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  title: { type: String, default: '' },
  content: {
    greeting: { type: String, default: '' },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    scope: { type: [String], default: [] },
    timeline: { type: String, default: '' },
    pricingNote: { type: String, default: '' },
    closing: { type: String, default: '' },
  },
  pdfUrl: { type: String, default: '' }, // served from /uploads/proposals
  status: { type: String, enum: ['draft', 'sent'], default: 'draft' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Proposal', proposalSchema);