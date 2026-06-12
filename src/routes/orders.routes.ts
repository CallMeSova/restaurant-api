import { Router } from 'express';
import { getOrders, getOrderById } from '../controllers/orders.controller';

const router = Router();

// GET /api/orders?status=pending&table_id=1
router.get('/', getOrders);
router.get('/:id', getOrderById);

export default router;
