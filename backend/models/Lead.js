// backend/models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  companyName: { type: String, trim: true, default: '' },
  website: { type: String, required: [true, 'Website is required'], trim: true },
  contactEmail: { type: String, trim: true, lowercase: true, default: '' },
  contactPhone: { type: String, trim: true, default: '' },
  industry: { type: String, trim: true, default: '' },

  // What the AI found when it looked at the site
  analysis: {
    summary: { type: String, default: '' },
    techObserved: { type: [String], default: [] },
    opportunities: { type: [String], default: [] },
    score: { type: Number, min: 0, max: 100, default: 0 }, // how good a fit, 0-100
  },

  status: {
    type: String,
    enum: ['new', 'analyzed', 'proposal_ready', 'contacted', 'replied', 'meeting', 'won', 'lost'],
    default: 'new',
  },

  notes: { type: String, default: '' },

  addedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

leadSchema.pre('save', function () {
  this.updatedAt = new Date();
});

module.exports = mongoose.model('Lead', leadSchema);