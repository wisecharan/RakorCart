import { useState, useEffect } from 'react';
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

  const [couponCode, setCouponCode] = useState('');
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
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

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <CheckoutSteps step1 step2 step3 step4 />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Review Order</h1>
            <p className="text-gray-600 text-lg">Confirm your order details</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping</h2>
                <p className="text-gray-600">
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                <p className="text-gray-600">{cart.paymentMethod}</p>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg mr-4" />
                          <Link to={`/product/${item._id}`} className="font-medium text-gray-900 hover:text-gray-700 transition-colors">
                            {item.name}
                          </Link>
                        </div>
                        <div className="text-gray-900 font-medium">
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Items:</p>
                    <p className="font-semibold text-gray-900">${cart.itemsPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping:</p>
                    <p className="font-semibold text-gray-900">${cart.shippingPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Tax:</p>
                    <p className="font-semibold text-gray-900">${cart.taxPrice}</p>
                  </div>
                </div>

                {/* Coupon Section */}
                {!cart.coupon ? (
                  <form onSubmit={applyCouponHandler} className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Have a coupon?</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={couponCode} 
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())} 
                        placeholder="COUPON CODE" 
                        className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                      />
                      <button 
                        type="submit" 
                        disabled={loadingCoupon}
                        className="px-6 py-3 text-sm text-white bg-gray-600 rounded-r-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between text-green-600 mb-6">
                    <p>Coupon Applied ({cart.coupon.code}):</p>
                    <p className="font-semibold">-${cart.discountPrice}</p>
                  </div>
                )}
                
                {/* Total */}
                <div className="flex justify-between font-semibold text-xl border-t border-gray-100 pt-4 mb-6">
                  <p className="text-gray-900">Total:</p>
                  <p className="text-gray-900">${cart.totalPrice}</p>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-center mb-4">{error?.data?.message || error.error}</p>
                )}

                {/* Place Order Button */}
                <button
                  type="button"
                  className="w-full bg-gray-900 text-white font-medium py-4 px-6 rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  disabled={cart.cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;