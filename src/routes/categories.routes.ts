import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categories.controller';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Admin/Manager write routes
router.post('/', authenticate, requireRole(['admin', 'manager']), createCategory);
router.put('/:id', authenticate, requireRole(['admin', 'manager']), updateCategory);
router.delete('/:id', authenticate, requireRole(['admin', 'manager']), deleteCategory);

export default router;

