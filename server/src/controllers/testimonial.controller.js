import asyncHandler from '../utils/asyncHandler.js';
import Testimonial from '../models/Testimonial.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAll = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort('order');
  res.status(200).json(ApiResponse.success(testimonials));
});

export const getFeatured = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ featured: true }).sort('order');
  res.status(200).json(ApiResponse.success(testimonials));
});

export const create = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json(ApiResponse.created(testimonial));
});

export const update = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) throw ApiError.notFound('Testimonial not found');
  res.status(200).json(ApiResponse.success(testimonial));
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw ApiError.notFound('Testimonial not found');
  res.status(200).json(ApiResponse.success(null, 'Testimonial deleted'));
});
