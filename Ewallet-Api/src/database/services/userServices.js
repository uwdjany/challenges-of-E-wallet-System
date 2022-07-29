import User from '../models/userModel';

class UserService {
  static async signUp(newUser) {
    try {
      return await User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async findUser(user) {
    try {
      return await User.findOne(user);
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
