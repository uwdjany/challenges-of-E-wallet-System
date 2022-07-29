import { Router } from 'express';
import userRouter from './user';
import walletRouter from './wallet';

const router = Router();

router.use('/user', userRouter);
router.use('/wallet', walletRouter);
export default router;
