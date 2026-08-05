import asyncHandler from '../utils/asyncHandler.js';
import TeamMember from '../models/TeamMember.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAll = asyncHandler(async (req, res) => {
  const team = await TeamMember.find({ isActive: true }).sort('order');
  res.status(200).json(ApiResponse.success(team));
});

export const create = asyncHandler(async (req, res) => {
  const member = await TeamMember.create(req.body);
  res.status(201).json(ApiResponse.created(member));
});

export const update = asyncHandler(async (req, res) => {
  const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!member) throw ApiError.notFound('Team member not found');
  res.status(200).json(ApiResponse.success(member));
});

export const deleteMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findByIdAndDelete(req.params.id);
  if (!member) throw ApiError.notFound('Team member not found');
  res.status(200).json(ApiResponse.success(null, 'Team member deleted'));
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

  await TeamMember.bulkWrite(updates);
  res.status(200).json(ApiResponse.success(null, 'Team members reordered successfully'));
});
