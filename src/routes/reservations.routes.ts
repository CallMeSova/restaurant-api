import { Router } from 'express';
import { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } from '../controllers/reservations.controller';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

// GET /api/reservations?status=pending
router.get('/', authenticate, requireRole(['admin', 'manager', 'waiter']), getReservations);
router.get('/:id', authenticate, requireRole(['admin', 'manager', 'waiter']), getReservationById);

// Write routes
router.post('/', createReservation); // Public for customers/clients to reserve
router.put('/:id', authenticate, requireRole(['admin', 'manager', 'waiter']), updateReservation);
router.delete('/:id', authenticate, requireRole(['admin', 'manager', 'waiter']), deleteReservation);

export default router;

