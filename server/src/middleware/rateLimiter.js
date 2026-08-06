// Disabled for development to prevent 429 errors
export const generalLimiter = (req, res, next) => next();
export const authLimiter = (req, res, next) => next();
export const contactLimiter = (req, res, next) => next();
