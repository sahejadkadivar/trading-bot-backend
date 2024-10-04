import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';

class AuthController {
  async register(req, res) {
    const { username, password } = req.body;
    try {
      const user = await userRepository.createUser({ username, password });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Registration failed', details: error.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await userRepository.findUserByUsername(username);
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }

  logout(req, res) {
    res.status(200).json({ message: 'Logged out successfully' });
  }
}

export default new AuthController();
