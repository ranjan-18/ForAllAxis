import { Router } from 'express';
import { submit, getAll, getById, updateStatus, deleteContact } from '../controllers/contact.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { contactFormSchema } from '../validators/contact.validator.js';

const router = Router();

router.post('/', contactLimiter, validate(contactFormSchema), submit);

router.use(protect, authorize('admin'));
router.get('/', getAll);
router.get('/:id', getById);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteContact);

export default router;
