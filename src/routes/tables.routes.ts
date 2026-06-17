import { Router } from 'express';
import { getTables, getTableById, getTablesByStatus, createTable, updateTable, deleteTable } from '../controllers/tables.controller';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

router.get('/', authenticate, getTables);
router.get('/status/:status', authenticate, getTablesByStatus);
router.get('/:id', authenticate, getTableById);

// Admin/Manager write routes
router.post('/', authenticate, requireRole(['admin', 'manager']), createTable);
router.put('/:id', authenticate, requireRole(['admin', 'manager']), updateTable);
router.delete('/:id', authenticate, requireRole(['admin', 'manager']), deleteTable);

export default router;

