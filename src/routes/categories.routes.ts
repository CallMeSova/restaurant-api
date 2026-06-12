import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categories.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Admin-only write routes
router.post('/', isAdmin, createCategory);
router.put('/:id', isAdmin, updateCategory);
router.delete('/:id', isAdmin, deleteCategory);

export default router;
