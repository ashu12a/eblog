import express from 'express';
import { register, login, getCurrentUser } from '../controllers/userController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/me', protect, getCurrentUser); // Protected route

export default userRoutes;
