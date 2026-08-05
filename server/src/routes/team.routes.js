import { Router } from 'express';
import { getAll, create, update, deleteMember, reorder } from '../controllers/team.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAll);

router.use(protect, authorize('admin'));
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteMember);
router.patch('/reorder', reorder);

export default router;
