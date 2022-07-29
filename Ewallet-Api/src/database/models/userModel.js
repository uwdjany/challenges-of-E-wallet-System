import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  fullname: {
    type: String,
  },
  phone: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  walletRef: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  }
}, {
  timestamps: true
});
export default mongoose.model('User', userSchema);
