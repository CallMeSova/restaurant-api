import { Router } from 'express';
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orders.controller';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

// GET /api/orders?status=pending&table_id=1
router.get('/', authenticate, requireRole(['admin', 'manager', 'chef', 'waiter']), getOrders);
router.get('/:id', authenticate, requireRole(['admin', 'manager', 'chef', 'waiter']), getOrderById);

// Write routes
router.post('/', createOrder); // Public for customers/staff to place order
router.put('/:id', authenticate, requireRole(['admin', 'manager', 'chef', 'waiter']), updateOrder);
router.delete('/:id', authenticate, requireRole(['admin', 'manager']), deleteOrder);

export default router;

