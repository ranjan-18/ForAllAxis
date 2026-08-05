import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';
import { env } from '../config/env.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(ApiError.unauthorized('Not authorized to access this route'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(ApiError.unauthorized('User no longer exists'));
    }
    next();
  } catch (error) {
    return next(ApiError.unauthorized('Not authorized, token failed'));
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden(`User role ${req.user.role} is not authorized to access this route`));
    }
    next();
  };
};
