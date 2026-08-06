import asyncHandler from '../utils/asyncHandler.js';
import Career from '../models/Career.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAll = asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  const careers = await Career.find(filter).sort('-createdAt');
  res.status(200).json(ApiResponse.success(careers));
});

export const getAllAdmin = asyncHandler(async (req, res) => {
  const careers = await Career.find().sort('-createdAt');
  res.status(200).json(ApiResponse.success(careers));
});

export const getBySlug = asyncHandler(async (req, res) => {
  const career = await Career.findOne({ slug: req.params.slug });
  if (!career) throw ApiError.notFound('Career not found');
  res.status(200).json(ApiResponse.success(career));
});

export const create = asyncHandler(async (req, res) => {
  const career = await Career.create(req.body);
  res.status(201).json(ApiResponse.created(career));
});

export const update = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);
  if (!career) throw ApiError.notFound('Career not found');
  
  const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(ApiResponse.success(updatedCareer));
});

export const deletePost = asyncHandler(async (req, res) => {
  const career = await Career.findByIdAndDelete(req.params.id);
  if (!career) throw ApiError.notFound('Career not found');
  res.status(200).json(ApiResponse.success(null, 'Career deleted'));
});

export const togglePublish = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);
  if (!career) throw ApiError.notFound('Career not found');
  
  career.isActive = !career.isActive;
  await career.save();
  
  res.status(200).json(ApiResponse.success(career));
});
