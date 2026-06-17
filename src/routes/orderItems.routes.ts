import { Router } from 'express';
import { getOrderItems, getOrderItemById, createOrderItem, updateOrderItem, deleteOrderItem } from '../controllers/orderItems.controller';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

// GET /api/order-items?order_id=1
router.get('/', authenticate, requireRole(['admin', 'manager', 'chef', 'waiter']), getOrderItems);
router.get('/:id', authenticate, requireRole(['admin', 'manager', 'chef', 'waiter']), getOrderItemById);

// Write routes
router.post('/', createOrderItem); // Public for customers/staff to add items
router.put('/:id', authenticate, requireRole(['admin', 'manager', 'chef', 'waiter']), updateOrderItem);
router.delete('/:id', authenticate, requireRole(['admin', 'manager', 'waiter']), deleteOrderItem);

export default router;

