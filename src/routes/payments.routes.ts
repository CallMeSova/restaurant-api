import { Router } from 'express';
import { getPayments, getPaymentById } from '../controllers/payments.controller';

const router = Router();

// GET /api/payments?status=completed&method=cash
router.get('/', getPayments);
router.get('/:id', getPaymentById);

export default router;
