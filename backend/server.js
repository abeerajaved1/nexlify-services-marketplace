// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');                     // ← added
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION! Server crashing...', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const app = express();

// ────────────────────────────────────────────────
//  DEVELOPMENT / PRODUCTION CORS CONFIG
// ────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',     // Vite default
  'http://localhost:3000',     // sometimes used
  'http://127.0.0.1:5173',
  'http://localhost:5174',     // port variation
];

// More flexible CORS for development
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, true);

    if (process.env.NODE_ENV === 'development' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
}));

// ────────────────────────────────────────────────
//  STATIC FILES (important: serve BEFORE most middlewares)
// ────────────────────────────────────────────────
app.use('/uploads', (req, res, next) => {
  // Optional: small log to confirm requests are reaching here
  if (process.env.NODE_ENV === 'development') {
    console.log(`[STATIC] Serving: ${req.url}`);
  }
  next();
}, express.static(path.join(__dirname, 'public/uploads')));

// ────────────────────────────────────────────────
//  OTHER MIDDLEWARES
// ────────────────────────────────────────────────
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// Rate limiter
const isDev = process.env.NODE_ENV !== 'production';
const limiter = rateLimit({
  windowMs: isDev ? 15 * 60 * 1000 : parseInt(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  max: isDev ? 500 : parseInt(process.env.RATE_LIMIT_MAX || 100),
  message: { success: false, message: 'Too many requests, please wait a moment.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isDev && (
    req.method === 'OPTIONS' ||
    req.path === '/api/admin/refresh' ||
    req.path === '/api/admin/me'
  )
});
app.use(limiter);

app.use(express.json());

// ─── Routes ───
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/requests', authMiddleware, requestRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is live! 🚀', env: process.env.NODE_ENV || 'development' });
});

// 404 handler for API
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} | Mode: ${process.env.NODE_ENV || 'development'}`);
});