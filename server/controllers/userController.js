import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ success:true, user });
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success:false, error: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.status(200).json({ success:true, message: 'Login successful', token });
  } catch (err) {
    res.status(400).json({ success:false, error: err.message });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
