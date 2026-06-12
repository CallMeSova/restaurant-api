import { Router } from 'express';
import { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } from '../controllers/reservations.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

// GET /api/reservations?status=pending
router.get('/', getReservations);
router.get('/:id', getReservationById);

// Write routes
router.post('/', createReservation); // Public for customers/clients
router.put('/:id', isAdmin, updateReservation);
router.delete('/:id', isAdmin, deleteReservation);

export default router;
