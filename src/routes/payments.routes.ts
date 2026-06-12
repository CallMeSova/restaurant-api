import { Router } from 'express';
import { getPayments, getPaymentById, createPayment, updatePayment } from '../controllers/payments.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

// GET /api/payments?status=completed&method=cash
router.get('/', getPayments);
router.get('/:id', getPaymentById);

// Write routes
router.post('/', createPayment); // Public for cashiers/systems to submit payment
router.put('/:id', isAdmin, updatePayment);

export default router;
