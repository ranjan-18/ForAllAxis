import { env } from './env.js';

const rawOrigins = env.CLIENT_URL
  ? env.CLIENT_URL.split(',').map(o => o.trim())
  : [];

// Separate exact origins from wildcard patterns (prefix with "pattern:")
const exactOrigins = rawOrigins.filter(o => !o.startsWith('pattern:'));
const patternOrigins = rawOrigins
  .filter(o => o.startsWith('pattern:'))
  .map(o => new RegExp(o.replace('pattern:', '')));

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (exactOrigins.includes('*') || exactOrigins.includes(origin)) return true;
  return patternOrigins.some(regex => regex.test(origin));
};

export const corsOptions = {
  origin: function (origin, callback) {
    if (isOriginAllowed(origin)) return callback(null, true);
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
  if (isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Cookie');
  }
};

export default corsOptions;
