// backend/routes/chatbotRoutes.js
const express = require('express');
const { chat, health } = require('../chatbot/chatController');

const router = express.Router();

router.post('/chat', chat);
router.get('/health', health);

module.exports = router;