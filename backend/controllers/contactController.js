// backend/controllers/contactController.js
const Request = require('../models/Request');
const transporter = require('../utils/email'); // ← IMPORT shared transporter
const config = require('../config');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    console.log('New request received:', { name, email, service });

    const newRequest = new Request({ name, email, service: service || 'General', message });
    await newRequest.save();

    console.log('Request saved to DB');

    // Email to owner
    await transporter.sendMail({
      from: config.gmailUser,
      to: config.gmailUser,
      subject: `New Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service || 'General'}\nMessage: ${message}\nReply to: ${email}`,
      replyTo: email,
    });

    console.log('Email sent to owner');

    // Confirmation to user
    await transporter.sendMail({
      from: config.gmailUser,
      to: email,
      subject: 'Your Request Received – Nexlify Services',
      text: `Dear ${name},\n\nThank you for contacting Nexlify Services. Your request for "${service || 'general inquiry'}" has been received and is under review. We'll get back to you soon.\n\nYour message: "${message}"\n\nBest regards,\nNexlify Team\n${config.gmailUser}`,
    });

    console.log('Confirmation email sent to user');

    res.status(201).json({ success: true, message: 'Request submitted! Check your email for confirmation.' });
  } catch (error) {
    console.error('Contact submission error:', error.message || error);
    res.status(500).json({ success: false, message: 'Failed to process request' });
  }
};