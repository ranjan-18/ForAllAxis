import asyncHandler from '../utils/asyncHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest('No image file provided');
  
  const folder = req.body.folder || 'forallaxis/general';
  const result = await uploadToCloudinary(req.file.buffer, folder);
  
  res.status(200).json(ApiResponse.success(result, 'Image uploaded successfully'));
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) throw ApiError.badRequest('Public ID is required');
  
  await deleteFromCloudinary(publicId);
  res.status(200).json(ApiResponse.success(null, 'Image deleted successfully'));
});
