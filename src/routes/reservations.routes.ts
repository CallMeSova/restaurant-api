import { Router } from 'express';
import { getReservations, getReservationById } from '../controllers/reservations.controller';

const router = Router();

// GET /api/reservations?status=pending
router.get('/', getReservations);
router.get('/:id', getReservationById);

export default router;
