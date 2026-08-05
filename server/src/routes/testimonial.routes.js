import { Router } from 'express';
import { getAll, getFeatured, create, update, deleteTestimonial } from '../controllers/testimonial.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAll);
router.get('/featured', getFeatured);

router.use(protect, authorize('admin'));
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteTestimonial);

export default router;
