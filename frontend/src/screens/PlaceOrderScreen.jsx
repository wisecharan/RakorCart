import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCart, applyCoupon, removeCoupon } from '../slices/cartSlice';
import { useValidateCouponMutation } from '../slices/couponsApiSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState(cart.coupon?.code || '');
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [validateCoupon, { isLoading: loadingCoupon }] = useValidateCouponMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        discountPrice: cart.discountPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const applyCouponHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await validateCoupon({ code: couponCode }).unwrap();
      dispatch(applyCoupon({ code: couponCode.toUpperCase(), discount: res.discount }));
      toast.success(res.message);
    } catch (err) {
      dispatch(removeCoupon());
      toast.error(err?.data?.message || err.error);
    }
  };

  const removeCouponHandler = () => {
    dispatch(removeCoupon());
    setCouponCode('');
    toast.info('Coupon removed');
  };

  return (
    <div className="container mx-auto mt-10 text-white">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* ... Shipping, Payment Method, Order Items sections ... */}
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-gray-800 p-6 rounded-lg h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between"><p>Items:</p> <p>${cart.itemsPrice}</p></div>
            <div className="flex justify-between"><p>Shipping:</p> <p>${cart.shippingPrice}</p></div>
            <div className="flex justify-between"><p>Tax:</p> <p>${cart.taxPrice}</p></div>
          </div>

          <form onSubmit={applyCouponHandler} className="my-4">
            <label className="block text-sm font-medium text-gray-300">Coupon Code</label>
            <div className="flex mt-1">
              <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} disabled={cart.coupon} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md disabled:bg-gray-600"/>
              <button type="submit" disabled={loadingCoupon || cart.coupon} className="px-4 py-2 bg-blue-600 rounded-r-md disabled:bg-gray-500">Apply</button>
            </div>
          </form>

          {cart.coupon && (
            <div className="flex justify-between items-center text-green-400 my-2">
              <div>
                <p>Discount ({cart.coupon.code} - {cart.coupon.discount}%):</p>
                <p>-${cart.discountPrice}</p>
              </div>
              <button onClick={removeCouponHandler} className="text-red-500 text-xs">Remove</button>
            </div>
          )}

          <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-2 mt-2">
            <p>Total:</p> <p>${cart.totalPrice}</p>
          </div>

          <button
            type="button"
            className="w-full mt-6 bg-blue-600 font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
            disabled={cart.cartItems.length === 0 || isLoading}
            onClick={placeOrderHandler}
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;