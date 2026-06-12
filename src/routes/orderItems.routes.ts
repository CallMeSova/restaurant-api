import { Router } from 'express';
import { getOrderItems, getOrderItemById, createOrderItem, updateOrderItem, deleteOrderItem } from '../controllers/orderItems.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

// GET /api/order-items?order_id=1
router.get('/', getOrderItems);
router.get('/:id', getOrderItemById);

// Write routes
router.post('/', createOrderItem); // Public for customers/staff to add items
router.put('/:id', isAdmin, updateOrderItem);
router.delete('/:id', isAdmin, deleteOrderItem);

export default router;
