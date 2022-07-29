import Wallet from '../models/walletModel';

class WalletService {
  static async addWallet(newWallet) {
    try {
      return await Wallet.create(newWallet);

    } catch (error) {
      throw error;
    }
  }

  static async findBalance(walletRef) {
    try {
      return await Wallet.findOne(walletRef).select('balance');
    } catch (error) {
      throw error;
    }
  }
  static async findWallet(walletRef) {
    try {
      return await Wallet.findOne(walletRef);
    } catch (error) {
      throw error;
    }
  }

  static async updateBalance(query, amount) {
    try {
      return await Wallet.findOneAndUpdate(query, {$inc : {'balance' : amount}},{new: true});
    } catch (error) {
      throw error;
    }
  }
}
export default WalletService;

