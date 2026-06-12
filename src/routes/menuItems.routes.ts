import { Router } from 'express';
import { getMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuItems.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

// GET /api/menu-items?category_id=1&available=true
router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

// Admin only routes
router.post('/', isAdmin, createMenuItem);
router.put('/:id', isAdmin, updateMenuItem);
router.delete('/:id', isAdmin, deleteMenuItem);

export default router;
