import out from '../helpers/response';
import userService from '../database/services/userServices';
import { check, generate } from '../helpers/bcrypt';
import { sign } from '../helpers/jwt';
import WalletService from '../database/services/walletService';

class UserController {
  static async login(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { account } = req.body;
      const user = await userService.findUser({ $or: [{ email: account }, { username: account }] });
      if (!user) return out(res, 404, 'Username or email not registered', null, 'NOT_FOUND');
      const isMatch = await check(user.password, req.body.password);
      if (!isMatch) return out(res, 400, 'email or password incorrect', null, 'AUTHENTICATION_ERROR');
      const token = await sign({ walletRef: user.walletRef, id: user._id });
      user.password = undefined;
      user._doc.token = token;
      return out(res, 200, 'Logged in successfully', user);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async signup(req, res) {
    try {
      const {
        fullname, email, username, phone, password
      } = req.body;
      const isExist = await userService.findUser({ $or: [{ email }, { username }, { phone }] });
      if (isExist) return out(res, 409, 'User already exist', null, 'USER_EXIST');
      const hashedPassword = await generate(password);
      const user = await userService.signUp({
        fullname,
        phone,
        email,
        username,
        walletRef: `${username}_wallet`,
        password: hashedPassword,
      });
      await WalletService.addWallet({ userId: user._id, balance: 1000, walletRef: `${user.username}_wallet` });
      user.password = undefined;
      return out(res, 201, 'User created successfully', user);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}
export default UserController;
