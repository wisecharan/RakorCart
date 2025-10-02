import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  forgotPassword,
  resetPassword,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Private User Routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Private Admin Routes
router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;