import asyncHandler from '../utils/asyncHandler.js';
import Project from '../models/Project.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAll = asyncHandler(async (req, res) => {
  const { category, featured, status, sort = 'order' } = req.query;
  const filter = {};
  
  if (category) filter.category = category;
  if (featured) filter.featured = featured === 'true';
  if (status) filter.status = status;

  const projects = await Project.find(filter).sort(sort);
  res.status(200).json(ApiResponse.success(projects));
});

export const getBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) throw ApiError.notFound('Project not found');
  res.status(200).json(ApiResponse.success(project));
});

export const create = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(ApiResponse.created(project));
});

export const update = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) throw ApiError.notFound('Project not found');
  res.status(200).json(ApiResponse.success(project));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw ApiError.notFound('Project not found');
  res.status(200).json(ApiResponse.success(null, 'Project deleted'));
});

export const toggleFeatured = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw ApiError.notFound('Project not found');
  project.featured = !project.featured;
  await project.save();
  res.status(200).json(ApiResponse.success(project));
});
