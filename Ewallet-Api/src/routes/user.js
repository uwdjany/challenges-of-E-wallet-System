import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);

export default router;
