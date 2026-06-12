import { Router } from 'express';
import { getTables, getTableById, getTablesByStatus, createTable, updateTable, deleteTable } from '../controllers/tables.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', getTables);
router.get('/status/:status', getTablesByStatus);
router.get('/:id', getTableById);

// Admin-only write routes
router.post('/', isAdmin, createTable);
router.put('/:id', isAdmin, updateTable);
router.delete('/:id', isAdmin, deleteTable);

export default router;
