import User from '../models/userModel.js';

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByUsername(username) {
    return await User.findOne({ username });
  }
}

export default new UserRepository();
