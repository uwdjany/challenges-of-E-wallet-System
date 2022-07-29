import { Router } from 'express';
import walletController from '../controllers/walletController';
import { isUser } from '../middlewares/authorization';


const router = Router();
router.put('/transfer', isUser, walletController.sendMoney);
router.get('/balance', isUser, walletController.getBalance);
router.post('/deposit', isUser, walletController.depositMoney);

export default router;
