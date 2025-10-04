import express from 'express';
const router = express.Router();
import { createCoupon, validateCoupon } from '../controllers/couponController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Admin route to create a coupon
router.route('/').post(protect, admin, createCoupon);

// User route to validate a coupon
router.post('/validate', protect, validateCoupon);

export default router;