import { Router } from 'express';
import { uploadImage, deleteImage } from '../controllers/upload.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';

const router = Router();

router.use(protect, authorize('admin'));
router.post('/', uploadSingle('image'), uploadImage);
router.delete('/', deleteImage);

export default router;
