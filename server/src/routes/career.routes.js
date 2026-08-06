import { Router } from 'express';
import { getAll, getAllAdmin, getBySlug, create, update, deletePost, togglePublish } from '../controllers/career.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createCareerSchema, updateCareerSchema } from '../validators/career.validator.js';

const router = Router();

router.get('/', getAll);
router.get('/:slug', getBySlug);

router.use(protect, authorize('admin'));
router.get('/admin/all', getAllAdmin);
router.post('/', validate(createCareerSchema), create);
router.put('/:id', validate(updateCareerSchema), update);
router.delete('/:id', deletePost);
router.patch('/:id/publish', togglePublish);

export default router;
