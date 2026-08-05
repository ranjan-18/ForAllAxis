import asyncHandler from '../utils/asyncHandler.js';
import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAll = asyncHandler(async (req, res) => {
  const services = await Service.find().sort('order');
  res.status(200).json(ApiResponse.success(services));
});

export const getBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) throw ApiError.notFound('Service not found');
  res.status(200).json(ApiResponse.success(service));
});

export const create = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(ApiResponse.created(service));
});

export const update = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) throw ApiError.notFound('Service not found');
  res.status(200).json(ApiResponse.success(service));
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw ApiError.notFound('Service not found');
  res.status(200).json(ApiResponse.success(null, 'Service deleted'));
});

export const reorder = asyncHandler(async (req, res) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) throw ApiError.badRequest('orderedIds must be an array');
  
  const updates = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { order: index },
    }
  }));

  await Service.bulkWrite(updates);
  res.status(200).json(ApiResponse.success(null, 'Services reordered successfully'));
});
