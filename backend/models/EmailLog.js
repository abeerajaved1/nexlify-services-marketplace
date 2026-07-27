// backend/models/EmailLog.js
const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  direction: { type: String, enum: ['outbound', 'inbound'], default: 'outbound' },
  stage: {
    type: String,
    enum: ['proposal', 'followup1', 'followup2', 'reply', 'other'],
    default: 'proposal',
  },
  subject: { type: String, default: '' },
  body: { type: String, default: '' },
  // draft = AI wrote it, waiting for you to approve
  // approved = you clicked approve, about to send
  // sent = actually sent via SMTP
  // failed = send attempt failed
  status: { type: String, enum: ['draft', 'approved', 'sent', 'failed'], default: 'draft' },
  errorMessage: { type: String, default: '' },
  sentAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailLog', emailLogSchema);