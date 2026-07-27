// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

// Load environment variables FIRST
dotenv.config();

// NOW import things that depend on env vars
const connectDB = require('./config/db');
const config = require('./config');

// Route imports
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const projectRoutes = require('./routes/projectRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const automationRoutes = require('./routes/automationRoutes');

// Connect Database
connectDB();

const app = express();

// ====================== TRUST PROXY ======================
app.set('trust proxy', 1);

// ====================== CORS ======================
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (config.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log('🚫 Blocked by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware - this handles ALL preflight automatically
app.use(cors(corsOptions));

// REMOVED: app.options('*', cors(corsOptions)); 
// Express 5 doesn't support * wildcard - cors() middleware already handles OPTIONS

// ====================== BODY PARSER ======================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ====================== STATIC FILES ======================
app.use('/uploads', express.static(path.join(__dirname, config.uploadDir)));

// ====================== RATE LIMITER ======================
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});

app.use(limiter);

// ====================== API ROUTES ======================
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/automation', automationRoutes);

// ====================== HOME ROUTE ======================
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is live! 🚀',
    environment: config.nodeEnv,
  });
});

// ====================== HEALTH CHECK ======================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// ====================== 404 HANDLER ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ====================== ERROR HANDLER ======================
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: config.nodeEnv === 'development' ? err.message : 'Internal server error',
  });
});

// ====================== START SERVER ======================
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} | Mode: ${config.nodeEnv}`);
});