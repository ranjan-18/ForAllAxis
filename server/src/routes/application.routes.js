import { Router } from 'express';
import { submitApplication, getApplications, updateApplicationStatus, deleteApplication } from '../controllers/application.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { generalLimiter } from '../middleware/rateLimiter.js';
import { uploadDocument } from '../middleware/upload.middleware.js';

const router = Router();

// Public route for submitting applications
router.post('/', generalLimiter, uploadDocument('resumeFile'), submitApplication);

// Admin routes
router.use(protect, authorize('admin'));
router.get('/', getApplications);
router.patch('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

export default router;
