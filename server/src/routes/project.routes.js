import { Router } from 'express';
import { getAll, getBySlug, create, update, deleteProject, toggleFeatured } from '../controllers/project.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createProjectSchema, updateProjectSchema } from '../validators/project.validator.js';

const router = Router();

router.get('/', getAll);
router.get('/:slug', getBySlug);

router.use(protect, authorize('admin'));
router.post('/', validate(createProjectSchema), create);
router.put('/:id', validate(updateProjectSchema), update);
router.delete('/:id', deleteProject);
router.patch('/:id/featured', toggleFeatured);

export default router;
