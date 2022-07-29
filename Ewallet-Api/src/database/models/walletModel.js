import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  walletRef: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, {
  timestamps: true
});
export default mongoose.model('Wallets', walletSchema);
