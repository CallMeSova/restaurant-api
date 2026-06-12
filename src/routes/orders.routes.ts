import { Router } from 'express';
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orders.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

// GET /api/orders?status=pending&table_id=1
router.get('/', getOrders);
router.get('/:id', getOrderById);

// Write routes
router.post('/', createOrder); // Public for customers/staff to place order
router.put('/:id', isAdmin, updateOrder);
router.delete('/:id', isAdmin, deleteOrder);

export default router;
