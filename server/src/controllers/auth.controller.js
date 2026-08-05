import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { generateToken, setTokenCookie } from '../utils/generateToken.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw ApiError.badRequest('User already exists');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  setTokenCookie(res, token);

  res.status(201).json(ApiResponse.created({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  }));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid credentials');
  }

  const token = generateToken(user._id);
  setTokenCookie(res, token);

  res.status(200).json(ApiResponse.success({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  }, 'Logged in successfully'));
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json(ApiResponse.success(null, 'Logged out successfully'));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json(ApiResponse.success(user));
});
