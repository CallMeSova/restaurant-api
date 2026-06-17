import { Router } from 'express';
import { getPayments, getPaymentById, createPayment, updatePayment } from '../controllers/payments.controller';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

// GET /api/payments?status=completed&method=cash
router.get('/', authenticate, requireRole(['admin', 'manager', 'waiter']), getPayments);
router.get('/:id', authenticate, requireRole(['admin', 'manager', 'waiter']), getPaymentById);

// Write routes
router.post('/', authenticate, requireRole(['admin', 'manager', 'waiter']), createPayment); // Restricted to cashiers/waiters/admins
router.put('/:id', authenticate, requireRole(['admin', 'manager']), updatePayment);

export default router;

