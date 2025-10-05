import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import OrderSummaryCard from '../components/OrderSummaryCard';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-start mt-8">
      {/* Left Column: Payment Form */}
      <div className="w-full">
        <CheckoutSteps step1 step2 step3 />
        <h1 className="text-2xl font-bold mb-6 text-text-dark">Select payment methods</h1>
        <form onSubmit={submitHandler}>
          <fieldset className="space-y-4">
            <div className="border border-gray-300 rounded-md p-4 flex items-center has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
              <input
                id="paypal"
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                PayPal
              </label>
            </div>
            <div className="border border-gray-300 rounded-md p-4 flex items-center has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
               <input
                id="creditcard"
                type="radio"
                name="paymentMethod"
                value="Credit Card"
                checked={paymentMethod === 'Credit Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="creditcard" className="ml-3 block text-sm font-medium text-gray-700">
                Credit Card
              </label>
            </div>
          </fieldset>
          <button type="submit" className="w-full mt-6 bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-hover transition-colors">
            Continue to payment
          </button>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full">
        <OrderSummaryCard />
      </div>
    </div>
  );
};

export default PaymentScreen;