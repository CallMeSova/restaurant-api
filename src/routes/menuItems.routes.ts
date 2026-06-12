import { Router } from 'express';
import { getMenuItems, getMenuItemById } from '../controllers/menuItems.controller';

const router = Router();

// GET /api/menu-items?category_id=1&available=true
router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

export default router;
