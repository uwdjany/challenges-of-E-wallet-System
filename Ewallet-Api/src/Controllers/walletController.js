import out from '../helpers/response';
import WalletService from '../database/services/walletService';

class walletController {
  static async sendMoney(req, res) {
    try {
      const { senderWalletRef, receiverWalletRef, amount } = req.body;
      const { id: userId } = req.user;
      if(amount<=0) return out(res, 422, 'Amount must be greater than 0', null, 'VALIDATION_ERROR');
      const senderWallet = await WalletService.findWallet({ walletRef: senderWalletRef });
      if(!senderWallet) return out(res, 404, 'Sender Wallet not found', null, 'NOT_FOUND');
      const receiverWallet = await WalletService.findWallet({ walletRef: receiverWalletRef });
      if(!receiverWallet) return out(res, 404, 'Receiver Wallet not found', null, 'NOT_FOUND');
      if(userId.toString() === receiverWallet.userId.toString()) return out(res, 400, 'You can not send money to your own wallet, deposit Instead.', null, 'BAD_REQUEST');
      if(1<=amount<=10000){
          if(senderWallet.balance < amount) return out(res, 400, 'Insufficient Balance', null, 'BAD_REQUEST');
          await WalletService.updateBalance({walletRef: receiverWalletRef},amount);
          const newBalance = await WalletService.updateBalance({walletRef: senderWalletRef},-amount);
          return out(res, 200, 'Money sent successfully, you were charged 0 RWF', newBalance);  
      }
      else if(10000<amount<=100000){
            if(senderWallet.balance < amount+200) return out(res, 400, 'Insufficient Balance', null, 'BAD_REQUEST');
            await WalletService.updateBalance({walletRef: receiverWalletRef},amount);
            const newBalance = await WalletService.updateBalance({walletRef: senderWalletRef},-amount-200); 
            return out(res, 200, 'Money sent successfully, you were charged 200 RWF', newBalance);
        }
      if(senderWallet.balance < amount+1000) return out(res, 400, 'Insufficient Balance', null, 'BAD_REQUEST');
        await WalletService.updateBalance({walletRef: receiverWalletRef},amount);
        const newBalance = await WalletService.updateBalance({walletRef: senderWalletRef},-amount-1000);
        return out(res, 200, 'Money sent successfully, you were charged 1000 RWF', newBalance);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
  static async getBalance(req, res) {
    try {
        const { walletRef } = req.user;
        const wallet = await WalletService.findBalance({ walletRef });
        return out(res, 200, 'Balance fetched successful', wallet);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
  static async depositMoney(req, res) {
    try {
        const { walletRef } = req.user;
        const { amount } = req.body;
        const newBalance = await WalletService.updateBalance({walletRef},amount);
        return out(res, 200, 'Balance fetched successful', newBalance);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default walletController;
