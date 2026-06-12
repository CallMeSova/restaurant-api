import { Router } from 'express';
import { getUsers, getUserById } from '../controllers/users.controller';
import { isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', isAdmin, getUsers);
router.get('/:id', isAdmin, getUserById);

export default router;
