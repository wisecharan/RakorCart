import Coupon from '../models/couponModel.js';

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = async (req, res) => {
  const { code, discount, expiryDate } = req.body;
  const couponExists = await Coupon.findOne({ code });

  if (couponExists) {
    res.status(400);
    throw new Error('Coupon code already exists');
  }

  const coupon = new Coupon({ 
    code: code.toUpperCase(), 
    discount, 
    expiryDate 
  });
  const createdCoupon = await coupon.save();
  res.status(201).json(createdCoupon);
};

// @desc    Validate a coupon
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (coupon && coupon.expiryDate > new Date()) {
    res.json({ 
      discount: coupon.discount,
      message: 'Coupon applied successfully'
    });
  } else {
    res.status(404);
    throw new Error('Coupon is invalid or has expired');
  }
};

export { createCoupon, validateCoupon };