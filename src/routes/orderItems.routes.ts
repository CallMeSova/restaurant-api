import { Router } from 'express';
import { getOrderItems, getOrderItemById } from '../controllers/orderItems.controller';

const router = Router();

// GET /api/order-items?order_id=1
router.get('/', getOrderItems);
router.get('/:id', getOrderItemById);

export default router;
