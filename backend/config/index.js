// backend/config/index.js
require('dotenv').config();

const path = require('path');

const config = {
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 5000,
  
  // Database
  mongoUri: process.env.MONGO_URI,
  
  // JWT Secrets
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  
  // Admin (for seeding only)
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  
  // Email
  gmailUser: process.env.GMAIL_USER,
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
  
  // CORS - comma-separated origins from env
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  
  // API Base URL (for generating image URLs in responses)
  apiBaseUrl: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
  
  // Upload directories
  uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
  projectsUploadDir: path.join(__dirname, '..', process.env.UPLOAD_DIR || 'public/uploads', 'projects'),
  servicesUploadDir: path.join(__dirname, '..', process.env.UPLOAD_DIR || 'public/uploads', 'services'),
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  
  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100,

  // Chatbot (Groq - FREE)
  groqApiKey: process.env.GROQ_API_KEY,
  chatbotModel: process.env.CHATBOT_MODEL || 'llama-3.3-70b-versatile',
  chatbotTemperature: parseFloat(process.env.CHATBOT_TEMPERATURE) || 0.3,
  chatbotMaxContext: parseInt(process.env.CHATBOT_MAX_CONTEXT) || 5,
};

// Validate required environment variables
const requiredVars = ['MONGO_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'GROQ_API_KEY'];
const missing = requiredVars.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ FATAL: Missing required environment variables:');
  missing.forEach(v => console.error(`   - ${v}`));
  process.exit(1);
}

module.exports = config;