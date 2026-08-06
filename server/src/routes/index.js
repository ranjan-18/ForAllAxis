import { Router } from 'express';
import authRoutes from './auth.routes.js';
import projectRoutes from './project.routes.js';
import serviceRoutes from './service.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import careerRoutes from './career.routes.js';
import contactRoutes from './contact.routes.js';
import teamRoutes from './team.routes.js';
import uploadRoutes from './upload.routes.js';
import applicationRoutes from './application.routes.js';
import ApiResponse from '../utils/ApiResponse.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json(ApiResponse.success({ status: 'UP' }, 'Server is healthy'));
});

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/careers', careerRoutes);
router.use('/contacts', contactRoutes);
router.use('/team', teamRoutes);
router.use('/upload', uploadRoutes);
router.use('/applications', applicationRoutes);

export default router;
