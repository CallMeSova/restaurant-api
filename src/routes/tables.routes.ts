import { Router } from 'express';
import { getTables, getTableById, getTablesByStatus } from '../controllers/tables.controller';

const router = Router();

router.get('/', getTables);
router.get('/status/:status', getTablesByStatus);
router.get('/:id', getTableById);

export default router;
