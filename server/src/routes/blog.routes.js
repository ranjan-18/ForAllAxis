import { Router } from 'express';
import { getAll, getAllAdmin, getBySlug, create, update, deletePost, togglePublish } from '../controllers/blog.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createBlogSchema, updateBlogSchema } from '../validators/blog.validator.js';

const router = Router();

router.get('/', getAll);
router.get('/:slug', getBySlug);

router.use(protect, authorize('admin'));
router.get('/admin/all', getAllAdmin);
router.post('/', validate(createBlogSchema), create);
router.put('/:id', validate(updateBlogSchema), update);
router.delete('/:id', deletePost);
router.patch('/:id/publish', togglePublish);

export default router;
