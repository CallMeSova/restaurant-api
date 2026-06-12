import { Router } from 'express';
import multer from 'multer';
import { uploadMenuImage } from '../controllers/upload.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

// เก็บ file ใน memory (ไม่บันทึกลง disk)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('รองรับเฉพาะไฟล์ JPG, PNG, WEBP เท่านั้น'));
    }
  },
});

// POST /api/menu-items/:id/image
router.post('/:id/image', isAdmin, upload.single('image'), uploadMenuImage);

export default router;
