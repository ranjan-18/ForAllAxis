import asyncHandler from '../utils/asyncHandler.js';
import JobApplication from '../models/JobApplication.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import cloudinary from '../config/cloudinary.js';

export const submitApplication = asyncHandler(async (req, res) => {
  const applicationData = { ...req.body };

  if (req.file) {
    const url = `http://localhost:5000/uploads/${req.file.filename}`;
    applicationData.resumeUrl = url;
  }
  
  delete applicationData.coverLetter; // Just in case it's sent

  const application = await JobApplication.create(applicationData);
  res.status(201).json(ApiResponse.created(application, 'Application submitted successfully'));
});

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await JobApplication.find().populate('career', 'title department').sort('-createdAt');
  res.status(200).json(ApiResponse.success(applications));
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await JobApplication.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).populate('career', 'title department');
  
  if (!application) throw ApiError.notFound('Application not found');
  res.status(200).json(ApiResponse.success(application, 'Status updated'));
});

export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findByIdAndDelete(req.params.id);
  if (!application) throw ApiError.notFound('Application not found');
  res.status(200).json(ApiResponse.success(null, 'Application deleted'));
});
