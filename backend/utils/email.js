// backend/utils/email.js
const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.gmailUser,
    pass: config.gmailAppPassword,
  },
});

// Verify on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Nodemailer setup FAILED:', error.message);
  } else {
    console.log('✅ Nodemailer is ready to send emails');
  }
});

module.exports = transporter;