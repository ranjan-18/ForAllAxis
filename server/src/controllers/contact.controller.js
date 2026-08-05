import asyncHandler from '../utils/asyncHandler.js';
import Contact from '../models/Contact.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sendContactNotification, sendContactConfirmation } from '../services/email.service.js';
import logger from '../utils/logger.js';

export const submit = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);

  // Send emails asynchronously
  Promise.all([
    sendContactNotification(contact),
    sendContactConfirmation(contact.email, contact.name)
  ]).catch(err => {
    logger.error('Email sending failed in contact controller', err);
  });

  res.status(201).json(ApiResponse.created(null, 'Message sent successfully'));
});

export const getAll = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort('-createdAt');
  res.status(200).json(ApiResponse.success(contacts));
});

export const getById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw ApiError.notFound('Contact request not found');
  res.status(200).json(ApiResponse.success(contact));
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status, notes },
    { new: true, runValidators: true }
  );
  if (!contact) throw ApiError.notFound('Contact request not found');
  res.status(200).json(ApiResponse.success(contact));
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) throw ApiError.notFound('Contact request not found');
  res.status(200).json(ApiResponse.success(null, 'Contact request deleted'));
});
