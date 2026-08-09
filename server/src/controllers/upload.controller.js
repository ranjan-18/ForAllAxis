import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import fs from 'fs';
import path from 'path';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest('No image file provided');
  
  // Dynamically determine the URL based on the request host
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
  res.status(200).json(ApiResponse.success({ url, publicId: req.file.filename }, 'Image uploaded successfully'));
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) throw ApiError.badRequest('Public ID is required');
  
  try {
    fs.unlinkSync(path.join(process.cwd(), 'uploads', publicId));
  } catch (err) {
    console.error(err);
  }
  
  res.status(200).json(ApiResponse.success(null, 'Image deleted successfully'));
});
