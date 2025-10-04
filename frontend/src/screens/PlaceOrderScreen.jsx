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
    <div className="container mx-auto mt-10 text-text-dark">
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <CheckoutSteps step1 step2 step3 step4 />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
            <h2 className="text-2xl font-bold mb-4">Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
            <h2 className="text-2xl font-bold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-border-light pb-2 last:border-b-0">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded mr-4" />
                      <Link to={`/product/${item._id}`} className="hover:underline font-semibold">{item.name}</Link>
                    </div>
                    <div className="text-gray-700">
                      {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24 border border-border-light">
          <h2 className="text-2xl font-bold mb-4 border-b border-border-light pb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between"><p className="text-gray-600">Items:</p> <p className="font-semibold">${cart.itemsPrice}</p></div>
            <div className="flex justify-between"><p className="text-gray-600">Shipping:</p> <p className="font-semibold">${cart.shippingPrice}</p></div>
            <div className="flex justify-between"><p className="text-gray-600">Tax:</p> <p className="font-semibold">${cart.taxPrice}</p></div>
          </div>

          {!cart.coupon ? (
            <form onSubmit={applyCouponHandler} className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Have a coupon?</label>
              <div className="flex mt-1">
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="COUPON CODE" className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-l-md focus:outline-none"/>
                <button type="submit" disabled={loadingCoupon} className="px-4 py-2 text-sm text-white bg-gray-600 rounded-r-md hover:bg-gray-700">Apply</button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between text-green-600 mt-4">
              <p>Coupon Applied ({cart.coupon.code}):</p>
              <p className="font-semibold">-${cart.discountPrice}</p>
            </div>
          )}
          
          <div className="flex justify-between font-bold text-xl border-t border-border-light pt-4 mt-4">
            <p>Total:</p> <p>${cart.totalPrice}</p>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error?.data?.message || error.error}</p>}
          <button
            type="button"
            className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-hover disabled:bg-gray-400"
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