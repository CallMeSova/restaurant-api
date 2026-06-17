import { Router } from 'express';
import { getMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuItems.controller';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

// GET /api/menu-items?category_id=1&available=true
router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

// Admin/Manager write routes
router.post('/', authenticate, requireRole(['admin', 'manager']), createMenuItem);
router.put('/:id', authenticate, requireRole(['admin', 'manager']), updateMenuItem);
router.delete('/:id', authenticate, requireRole(['admin', 'manager']), deleteMenuItem);

export default router;

