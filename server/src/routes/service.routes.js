import { Router } from 'express';
import { getAll, getBySlug, create, update, deleteService, reorder } from '../controllers/service.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAll);
router.get('/:slug', getBySlug);

router.use(protect, authorize('admin'));
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteService);
router.patch('/reorder', reorder);

export default router;
