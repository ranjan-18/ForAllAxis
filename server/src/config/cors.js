import { env } from './env.js';

const allowedOrigins = env.CLIENT_URL
  ? env.CLIENT_URL.split(',').map(o => o.trim())
  : [];

export const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server or same-origin requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: Origin ${origin} not allowed`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cookie'],
  exposedHeaders: ['set-cookie'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

// Helper to set CORS headers manually (used in error handler)
export const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (origin && (allowedOrigins.includes(origin) || allowedOrigins.includes('*'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Cookie');
  }
};

export default corsOptions;
